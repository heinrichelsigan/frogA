using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.TextBox;

namespace work.darkstar.frogWin.Controls
{
    public partial class FrogLevelControl : UserControl
    {
        internal Models.Game game;
        object? startInitLock, initLock;
        CarControl car0a, car0b, car0c, car1a, car1b, car1c, car1d, car4a, car4b, car4c;
        MoveControl wood0b, wood1b, wood2b, wood3b, wood0t, wood1t, wood2t, wood3t;
        volatile bool looperStarted = false;
        internal volatile uint currenTicks = 9;
        FrogFieldControl cFrog = null;

        public FrogLevelControl()
        {
            InitializeComponent();
            InitMovingObjects();
            // game.Started = true;
            // FrogALooper();            
        }

        public void Start()
        {
            startInitLock = new object();
            lock (startInitLock)
            {
                InitMovingObjects();
                game.Started = true;
                currenTicks = 0;
                game.Ticks = 0;
            }
            startInitLock = null;
            System.Timers.Timer tStart = new System.Timers.Timer { Interval = Constants.QSTARTINT };
            tStart.Elapsed += (s, en) =>
            {
                this.Invoke(new Action(() =>
                {
                    if (game.Started)
                    {
                        FrogALooper(currenTicks);
                    }
                }));
                tStart.Stop(); // Stop the timer(otherwise keeps on calling)
            };
            tStart.Start();
        }


        public void Stop()
        {
            initLock = new object();
            lock (initLock)
            {
                currenTicks = 0;
                game.Started = false;
            }
        }

        public virtual void FrogALooper(uint tick)
        {
            startInitLock = new object();
            lock (startInitLock)
            {
                startInitLock = null;
                if (tick < currenTicks)
                    return;
                else
                    looperStarted = true;
            }
            startInitLock = null;

            System.Timers.Timer tMove = new System.Timers.Timer { Interval = Constants.INTERVALL };
            tMove.Elapsed += (s, en) =>
            {
                this.Invoke(new Action(() =>
                {
                    if (game.Started)
                    {
                        initLock = new object();
                        lock (initLock)
                        {
                            currenTicks = (uint)game.LoopTick();                            
                        }
                        initLock = null;
                        DrawMap();
                        FrogALooper(currenTicks);                        
                    }
                }));
                tMove.Stop(); // Stop the timer(otherwise keeps on calling)
            };
            tMove.Start();
        }


        public virtual void InitMovingObjects()
        {
            game = new Models.Game();
            if (frog0f != null && frog0f.Parent != null)
            {
                Control frog0ParentCtrl = this.GetControlByName(this, frog0f.Parent.Name);
                if (frog0ParentCtrl != null)
                    frog0ParentCtrl.Controls.Remove(frog0f);
            }
            if (frog0f == null)
            {
                frog0f = new FrogFieldControl(0);
                frog0f.Name = "frog0f";
                frog0f.Padding = new Padding(0, 0, 0, 0);
                frog0f.BackColor = Color.Transparent;
                frog0f.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.froga;
                frog0f.BackgroundImageLayout = ImageLayout.Zoom;
            }
            if (frog1f != null && frog1f.Parent != null)
            {
                Control frog1ParentCtrl = this.GetControlByName(this, frog1f.Parent.Name);
                if (frog1ParentCtrl != null)
                    frog1ParentCtrl.Controls.Remove(frog1f);
            }
            if (frog1f == null)
            {
                frog1f = new FrogFieldControl(1);
                frog1f.Name = "frog1f";
                frog1f.Padding = new Padding(0, 0, 0, 0);
                frog1f.BackColor = Color.Transparent;
                frog1f.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.froga;
                frog1f.BackgroundImageLayout = ImageLayout.Zoom;
            }
            if (frog2f != null && frog2f.Parent != null)
            {
                Control frog2ParentCtrl = this.GetControlByName(this, frog2f.Parent.Name);
                if (frog2ParentCtrl != null)
                    frog2ParentCtrl.Controls.Remove(frog2f);
            }
            if (frog2f == null)
            {
                frog2f = new FrogFieldControl(2);
                frog2f.Name = "frog2f";
                frog2f.Padding = new Padding(0, 0, 0, 0);
                frog2f.BackColor = Color.Transparent;
                frog2f.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.froga;
                frog2f.BackgroundImageLayout = ImageLayout.Zoom;
            }
            if (frog3f != null && frog3f.Parent != null)
            {
                Control frog3ParentCtrl = this.GetControlByName(this, frog3f.Parent.Name);
                if (frog3ParentCtrl != null)
                    frog3ParentCtrl.Controls.Remove(frog3f);
            }
            if (frog3f == null)
            {
                frog3f = new FrogFieldControl(3);
                frog3f.Name = "frog3f";
                frog3f.Padding = new Padding(0, 0, 0, 0);
                frog3f.BackColor = Color.Transparent;
                frog3f.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.froga;
                frog3f.BackgroundImageLayout = ImageLayout.Zoom;
            }
            frogFCtrl9e.Controls.Add(frog0f);
            frogFCtrl9f.Controls.Add(frog1f);
            frogFCtrl9g.Controls.Add(frog2f);
            frogFCtrl9h.Controls.Add(frog3f);
            // if (car0a == null)
            car0a = new CarControl(0);
            // if (car0b == null)
            car0b = new CarControl(0);
            // if (car0c == null) 
            car0c = new CarControl(0);
            // if (car1a == null) 
            car1a = new CarControl(1);
            // if (car1b == null)
            // car1b = new CarControl(1);
            // if (car1c == null) 
            car1c = new CarControl(1);
            // if (car1d == null) 
            car1d = new CarControl(1);
            // if (car4a == null) 
            car4a = new CarControl(2);
            // if (car4b == null) 
            car4b = new CarControl(3);
            // if (car4c == null) 
            car4c = new CarControl(4);
            // if (wood0b == null) 
            wood0b = new MoveControl(6);
            // if (wood1b == null)
            wood1b = new MoveControl(6);
            // if (wood2b == null)
            wood2b = new MoveControl(6);
            // if (wood3b == null)
            wood3b = new MoveControl(6);
            // if (wood0t == null)
            wood0t = new MoveControl(7);
            // if (wood1t == null)
            wood1t = new MoveControl(7);
            // if (wood2t == null)
            wood2t = new MoveControl(7);
            // if (wood3t == null)
            wood3t = new MoveControl(7);
            if (cFrog == null) 
                cFrog = frog0f;
            DrawMap();

        }


        public virtual void DrawMap()
        {
            foreach (String moveStr in Constants.MOVES_STRS)
            {
                string moveName = "frogFCtrl" + moveStr.ToString();
                Control moveCtrl = GetControlByName(this, moveName);
                if (moveCtrl != null && moveCtrl.Controls != null && moveCtrl.Controls.Count > 0)
                {
                    Control aCarCtrl = moveCtrl.Controls[0];
                    if (aCarCtrl is MoveControl)
                        moveCtrl.Controls.RemoveAt(0);
                }
            }

            for (int chs1 = 0; chs1 < game.CharStreet0.Length; chs1++)
            {
                char chStreet1 = game.CharStreet0[chs1];
                string streetName1 = "frogFCtrl8" + chStreet1.ToString();
                Control streetCtrl1 = GetControlByName(this, streetName1);
                if (streetCtrl1 != null && streetCtrl1.Controls != null)
                {
                    switch (chs1)
                    {
                        case 0:
                            streetCtrl1.Controls.Add(car0a); break;
                        case 1:
                            streetCtrl1.Controls.Add(car0b); break;
                        case 2:
                            streetCtrl1.Controls.Add(car0c); break;
                        default: break;
                    }                    
                }
            }

            for (int chs2 = 0; chs2 < game.CharStreet1.Length; chs2++)
            {
                char chStreet2 = game.CharStreet1[chs2];
                string streetName2 = "frogFCtrl7" + chStreet2.ToString();
                Control streetCtrl2 = GetControlByName(this, streetName2);
                if (streetCtrl2 != null && streetCtrl2.Controls != null)
                {
                    switch (chs2)
                    {
                        case 0:
                            streetCtrl2.Controls.Add(car1a); break;
                        case 1:
                            streetCtrl2.Controls.Add(car1b); break;
                        case 2:
                            streetCtrl2.Controls.Add(car1c); break;
                        case 3:
                            streetCtrl2.Controls.Add(car1d); break;
                        default: break;
                    }
                }
            }

            for (int chs4 = 0; chs4 < game.CharStreet4m.Length; chs4++)
            {
                char chStreet4 = game.CharStreet4m[chs4];
                string streetName4 = "frogFCtrl5" + chStreet4.ToString();
                Control streetCtrl4 = GetControlByName(this, streetName4);
                if (streetCtrl4 != null && streetCtrl4.Controls != null)
                {
                    switch (chs4)
                    {
                        case 0:
                            streetCtrl4.Controls.Add(car4a); break;
                        case 1:
                            streetCtrl4.Controls.Add(car4b); break;
                        case 2:
                            streetCtrl4.Controls.Add(car4c); break;
                        default: break;
                    }
                }
            }


            for (int chr3 = 0; chr3 < game.CharRiver0.Length; chr3++)
            {
                char chRiver3 = game.CharRiver0[chr3];
                string riverName3 = "frogFCtrl3" + chRiver3.ToString();
                Control riverCtrl3 = GetControlByName(this, riverName3);
                if (riverCtrl3 != null && riverCtrl3.Controls != null)
                {
                    switch (chr3)
                    {
                        case 0:
                            riverCtrl3.Controls.Add(wood0b); break;
                        case 1:
                            riverCtrl3.Controls.Add(wood1b); break;
                        case 2:
                            riverCtrl3.Controls.Add(wood2b); break;
                        case 3:
                            riverCtrl3.Controls.Add(wood3b); break;
                        default: break;
                    }
                }
            }

            for (int chr2 = 0; chr2 < game.CharRiver1.Length; chr2++)
            {
                char chRiver2 = game.CharRiver1[chr2];
                string riverName2= "frogFCtrl2" + chRiver2.ToString();
                Control riverCtrl2 = GetControlByName(this, riverName2);
                if (riverCtrl2 != null && riverCtrl2.Controls != null)
                {
                    switch (chr2)
                    {
                        case 0:
                            riverCtrl2.Controls.Add(wood0t); break;
                        case 1:
                            riverCtrl2.Controls.Add(wood1t); break;
                        case 2:
                            riverCtrl2.Controls.Add(wood2t); break;
                        case 3:
                            riverCtrl2.Controls.Add(wood3t); break;
                        default: break;
                    }
                }
            }
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

        public FrogFieldControl GetCFrog()
        {
            FrogFieldControl acFrog = cFrog;
            switch (game.CurrentFrog)
            {
                case 0: acFrog = frog0f; break;
                case 1: acFrog = frog1f; break;
                case 2: acFrog = frog2f; break;
                case 3: acFrog = frog3f; break;
                default: acFrog = null; break;
            }
            return acFrog;
        }

        public virtual void KeyMoves(int key)
        {
            if (!game.Started)
                return;

            cFrog = GetCFrog();

            string uName = cFrog.Parent.Name;
            Control uCtrl = GetControlByName(this, uName);
            string nName = uName.Replace("frogFCtrl", "");
            int outDirection;
            switch (key)
            {
                case 0:
                    if (!string.IsNullOrEmpty(nName) && nName.Length > 1)
                    {
                        if (Int32.TryParse(nName[0].ToString(), out outDirection))
                        {
                            uCtrl.Controls.Remove(cFrog);
                            int intUp = outDirection;
                            char charUp = (char)nName[1];
                            if (intUp > 0)
                                intUp--;
                            string fUpName = "frogFCtrl" + intUp.ToString() + charUp.ToString();
                            Control fUpControl = GetControlByName(this, fUpName);
                            fUpControl.Controls.Add(cFrog);
                        }
                    }
                    break;
                case 1:
                    if (!string.IsNullOrEmpty(nName) && nName.Length > 1)
                    {
                        if (Int32.TryParse(nName[0].ToString(), out outDirection))
                        {
                            uCtrl.Controls.Remove(cFrog);
                            int intLeft = (int)outDirection;
                            char charLeft = (char)nName[1];
                            if (charLeft != 'a')
                            {
                                int intCharLeft = (int)charLeft;
                                intCharLeft--;
                                charLeft = (char)intCharLeft;
                            }
                            string fLeftName = "frogFCtrl" + intLeft.ToString() + charLeft.ToString();
                            Control fLeftControl = GetControlByName(this, fLeftName);
                            fLeftControl.Controls.Add(cFrog);
                        }
                    }
                    break;
                case 2:
                    if (!string.IsNullOrEmpty(nName) && nName.Length > 1)
                    {
                        if (Int32.TryParse(nName[0].ToString(), out outDirection))
                        {
                            uCtrl.Controls.Remove(cFrog);
                            int intRight = outDirection;
                            char charRight = (char)nName[1];
                            if (charRight != 'j')
                            {
                                int intCharRight = (int)charRight;
                                intCharRight++;
                                charRight = (char)intCharRight;
                            }
                            string fRigthName = "frogFCtrl" + intRight.ToString() + charRight.ToString();
                            Control fRightControl = GetControlByName(this, fRigthName);
                            fRightControl.Controls.Add(cFrog);
                        }
                    }
                    break;
                case 3:
                    if (!string.IsNullOrEmpty(nName) && nName.Length > 1)
                    {
                        if (Int32.TryParse(nName[0].ToString(), out outDirection))
                        {
                            uCtrl.Controls.Remove(cFrog);
                            int intDown = (int)outDirection;
                            char charDown = (char)nName[1];
                            if (intDown < 9)
                                intDown++;
                            string fDownName = "frogFCtrl" + intDown.ToString() + charDown.ToString();
                            Control fDownControl = GetControlByName(this, fDownName);
                            fDownControl.Controls.Add(cFrog);
                        }
                    }
                    break;
                default: break;
            }

            uName = cFrog.Parent.Name;
            uCtrl = GetControlByName(this, uName);
            nName = uName.Replace("frogFCtrl", "");

            if (nName == "0c" || nName == "0g")
            {
                initLock = new object();
                lock (initLock)
                {
                    game.FrogInGoal++;
                    game.CurrentFrog++;
                    cFrog = GetCFrog();
                }
            }
        }

    }
}
