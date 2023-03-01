using NLog;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Media;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace work.darkstar.frogWin.Controls
{
    [Serializable]
    public partial class FrogCustomControl : Panel
    {
        #region fields

        #region private fields


        #endregion private fields

        #region protected internal fields

        protected internal const string NL = Constants.CRLF;
        protected internal SoundPlayer soundPlayer;

        #endregion protected internal fields

        #region protectedFields

        protected static readonly NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();

        #endregion protectedFields

        #endregion fields

        #region Properties

        #region basic properties

        /// <summary>
        /// MenuLevelId for current supu menu level
        /// </summary>
        public virtual int MenuLevelId { get; set; }

        #endregion basic properties

        #endregion Properties

        /// <summary>
        /// Default void Constructor
        /// </summary>
        public FrogCustomControl()
        {
            // NLog commented out, since nuget package uninstalled
            var config = new NLog.Config.LoggingConfiguration();
            string baseDir = System.AppDomain.CurrentDomain.BaseDirectory.ToString();
            // baseDir = Application.ExecutablePath.ToString();
            string logFile = Path.Combine(baseDir, "supu_log.txt"); // "D:\\source\\froger\\windows\\logging\\supu_log.txt";
            // Targets where to log to: File and Console
            var logfile = new NLog.Targets.FileTarget("logfile") { FileName = logFile };
            var logconsole = new NLog.Targets.ConsoleTarget("logconsole");
            // Rules for mapping loggers to targets            
            config.AddRule(LogLevel.Trace, LogLevel.Trace, logconsole);
            config.AddRule(LogLevel.Debug, LogLevel.Debug, logfile);
            config.AddRule(LogLevel.Info, LogLevel.Info, logfile);
            config.AddRule(LogLevel.Warn, LogLevel.Warn, logfile);
            config.AddRule(LogLevel.Error, LogLevel.Error, logfile);
            config.AddRule(LogLevel.Fatal, LogLevel.Fatal, logfile);
            NLog.LogManager.Configuration = config; // Apply config

            components = new System.ComponentModel.Container();
            InitializeComponent();

            System.IO.Stream menuStram = global::work.darkstar.frogWin.Properties.Resources.ResourceManager.GetStream("jump01");
            soundPlayer = new SoundPlayer(menuStram);
        }

        /// <summary>
        /// Constructor with Level
        /// </summary>
        /// <param name="levelCnt">int</param>
        public FrogCustomControl(int levelCnt) : this()
        {
            this.MenuLevelId = levelCnt;
        }

        #region override

        /// <summary>
        /// OnPaint
        /// </summary>
        /// <param name="pe"PaintEventArgs></param>
        protected override void OnPaint(PaintEventArgs pe)
        {
            base.OnPaint(pe);
        }
        
        #endregion override

        #region basic sets

        /// <summary>
        /// SetGameMode sets basic generic for all SupuUserControls needed game modes
        /// </summary>
        /// <param name="level">real board sized level</param>
        /// <returns>frogA User Level (begins with 1 for 5x5 board)</returns>       
        public virtual int SetGameMode(int level)
        {
            if (level < Constants.MIN_LEVEL || level > Constants.MAX_LEVEL)
                throw new ApplicationException($"Level {level} is incorrect");

            ResetGameMode();
            MenuLevelId = level;

            return MenuLevelId;
        }

        /// <summary>
        /// Reset Game mode
        /// </summary>

        public virtual void ResetGameMode()
        {
            MenuLevelId = 1;
            //this.GameMode = gaMode;
            //this.Automat = auToMaTiON;
            //this.VisualHelp = vHelp;
            //this.SetSupuModeFromGameMode(gaMode, auToMaTiON, vHelp);
        }

        /// <summary>
        /// GetScreenResolution gets desktop screen from current cursor point
        /// </summary>
        /// <param name="screenX">double</param>
        /// <param name="screenY">double</param>
        /// <returns>Point with X as screen width and Y as screen height</returns>
        internal static Point GetScreenResolution(ref double screenX, ref double screenY)
        {
            Screen myScreen = Screen.FromPoint(Cursor.Position);
            System.Drawing.Rectangle area = myScreen.WorkingArea;
            screenX = area.Width;
            screenY = area.Height;
            Point pt = new Point((int)screenX, (int)screenY);
            return pt;
        }

        #endregion basic sets

        #region generic helper methods

        /// <summary>
        /// Get recursivley Windows.Forms.Control by name and type
        /// </summary>
        /// <param name="parentCntrl">parent entry / root control of tree</param>
        /// <param name="cntrlName">name to search</param>
        /// <param name="cntrlType">typeof control</param>
        /// <returns>control with name, otherwise null</returns>
        public virtual Control GetControlByNameType(Control parentCntrl, string cntrlName, Type cntrlType)
        {
            if (parentCntrl.Name == cntrlName && cntrlType == parentCntrl.GetType())
                return parentCntrl;

            foreach (Control childCntrl in parentCntrl.Controls)
            {
                Control resultCntrl = GetControlByNameType(childCntrl, cntrlName, cntrlType);
                if (resultCntrl != null)
                    return resultCntrl;
            }
            return null;
        }

        /// <summary>
        /// Get recursivley Windows.Forms.Control by name 
        /// </summary>
        /// <param name="parentCntrl">parent entry / root control of tree</param>
        /// <param name="cntrlName">name to search</param>
        /// <returns>control with name, otherwise null</returns>
        public virtual Control GetControlByName(Control parentCntrl, string cntrlName)
        {
            if (parentCntrl.Name == cntrlName)
                return parentCntrl;

            foreach (Control ChildCntl in parentCntrl.Controls)
            {
                Control ResultCntl = GetControlByName(ChildCntl, cntrlName);
                if (ResultCntl != null)
                    return ResultCntl;
            }
            return null;
        }

        /// <summary>
        /// log - logs to NLog, if SupuAppRegSets.Singelton.Debug is set to true
        /// to enable Debug and logging use command line Supu.exe with additional <para>debug</para> parameter
        /// <c>Supu.exe master debug</c>       
        /// </summary>
        /// <param name="level">log level: 0 for Trace, 1 for Debug, ..., 4 for Error, 5 for Fatal</param>
        /// <param name="msg">debug msg to log</param>
        protected virtual void log(int level, string msg)
        {
#if DEBUG
            NLog.LogLevel nlogLvl = NLog.LogLevel.Warn;
            switch (level)
            {
                case 0: nlogLvl = NLog.LogLevel.Trace; break;
                case 1: nlogLvl = NLog.LogLevel.Debug; break;
                case 2: nlogLvl = NLog.LogLevel.Info; break;
                case 3: nlogLvl = NLog.LogLevel.Warn; break;
                case 4: nlogLvl = NLog.LogLevel.Error; break;
                case 5: nlogLvl = NLog.LogLevel.Fatal; break;
                default: nlogLvl = NLog.LogLevel.Info; break;
            }
            logger.Log(nlogLvl, msg);
#endif
        }

        /// <summary>
        /// log Exception
        /// </summary>
        /// <param name="level">log level: 0 for Trace, 1 for Debug, ..., 4 for Error, 5 for Fatal</param>
        /// <param name="ex">Exception ex to log</param>
        protected virtual void log(int level, Exception ex)
        {
            log(level, ex.Message);
            if (level < 4)
                log(level, ex.ToString());
            if (level < 2)
                log(level, ex.StackTrace);
        }

        #endregion generic helper methods

        #region DynamicallyGetRessources

        /// <summary>
        /// Get Bitmap by Name from Ressources
        /// </summary>
        /// <param name="bitmapName">name of bitmap graphic</param>
        /// <returns>System.Drawing.Bitmap</returns>
        protected virtual Bitmap GetBitmap(string bitmapName)
        {
            return (Bitmap)global::work.darkstar.frogWin.Properties.Resources.ResourceManager.GetObject(bitmapName,
                System.Globalization.CultureInfo.InvariantCulture);
        }

        /// <summary>
        /// Get Icon by selected index from Ressources
        /// </summary>
        /// <returns>System.Drawing.Icon</returns>
        protected virtual Icon GetIcon()
        {
            // char colCh = Constants.COLUMNS[selected].GetUChar();

            return (Icon)global::work.darkstar.frogWin.Properties.Resources.ResourceManager.GetObject("frogWin",
                System.Globalization.CultureInfo.InvariantCulture);
        }

        #region PlaySounds    

        /// <summary>
        /// PlaySoundFromResource - plays a sound embedded in executing assembly
        /// </summary>
        /// <param name="soundName">unique qualified name inside ressource file for embedded sound file</param>
        /// <param name="soundFormatExtension">format extension of sound file</param>
        [Obsolete("Use generic PlaySound instead", false)]
        protected virtual void PlaySoundFromAssembly(string soundName, string soundFormatExtension = "wav")
        {
            if (true)
            {
                if (string.IsNullOrWhiteSpace(soundName) || string.IsNullOrWhiteSpace(soundFormatExtension))
                {
                    throw new ApplicationException($"sound name to search in ressources cannot be an NULL or empty or whitespace string");
                }

                const string ressourcePrefix = "Supu.Properties.Sound";
                string ressourceName = $"{ressourcePrefix}.{soundName}.{soundFormatExtension}";
                var a = System.Reflection.Assembly.GetExecutingAssembly();

                foreach (string resName in a.GetManifestResourceNames())
                {
                    if (resName.EndsWith($"{soundName}.{soundFormatExtension}") || resName.Contains($"{ressourcePrefix}.{soundName}"))
                    {
                        ressourceName = resName;
                        break;
                    }
                }

                System.IO.Stream s = a.GetManifestResourceStream(ressourceName);
                SoundPlayer player = new SoundPlayer(s);
                player.Play();
            }
        }

        /// <summary>
        /// PlaySoundFromResource - plays a sound embedded in application ressource file
        /// </summary>
        /// <param name="soundName">unique qualified name for sound</param>
        protected virtual void PlaySoundFromResource(string soundName)
        {
            if (true)
            {
                System.IO.Stream s;
                SoundPlayer player;
                try
                {
                    s = (System.IO.UnmanagedMemoryStream)global::work.darkstar.frogWin.Properties.Resources.ResourceManager.GetStream(
                        soundName, System.Globalization.CultureInfo.InvariantCulture);
                    player = new SoundPlayer(s);
                    player.Play();
                }
                catch (Exception ex)
                {
                    log(4, ex);
                    throw ex;
                }
            }
        }

        async protected virtual Task PlayMenuInteraction()
        {
            if (true)
            {
                if (soundPlayer == null)
                {
                    Stream sJump = work.darkstar.frogWin.Properties.Resources.ResourceManager.GetStream("jump01");
                    soundPlayer = new SoundPlayer(sJump);
                }
                await Task.Run(new Action(() => soundPlayer.Play()));
            }
        }

        /// <summary>
        /// Plays a sound in Supu Game
        /// Use this method, because you don't have to think and care, what's happening behind / inside the blackbox
        /// </summary>
        /// <param name="soundName">unique qualified name for sound</param>
        protected virtual void PlaySound(string soundName)
        {
            PlaySoundFromResource(soundName);
        }

        /// <summary>
        /// PlaySoundFromPath - plays a sound, that is deployed relative (beyond) to applicatio directory
        /// </summary>
        /// <param name="soundName">filename of sound file</param>
        /// <param name="soundFormatExtension">format extension of sound file</param>
        protected virtual void PlaySoundFromPath(string soundName, string soundFormatExtension = "wav")
        {
            string[] searchStrings = { $"{soundName}.{soundFormatExtension}", $"{soundName}", $"{soundFormatExtension}" }, soundFiles = null;

            foreach (string searchPattern in searchStrings)
            {
                soundFiles = System.IO.Directory.GetFiles(System.AppDomain.CurrentDomain.BaseDirectory.ToString(),
                  searchPattern, System.IO.SearchOption.AllDirectories);
                if (soundFiles != null && soundFiles.Length > 0 && !string.IsNullOrEmpty(soundFiles[0]))
                    break;
            }

            if (!System.IO.File.Exists(soundFiles[0]))
            {
                throw new System.IO.FileNotFoundException($"Supu sound not found in filepath = {soundFiles[0]}.");
            }
            SoundPlayer simpleSound = new SoundPlayer(soundFiles[0]);
            simpleSound.Play();
        }

        #endregion PlaySounds

        #endregion DynamicallyGetRessources

    }
}
