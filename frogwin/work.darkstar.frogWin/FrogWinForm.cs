using work.darkstar.frogWin.Models;
using work.darkstar.frogWin.Properties;

namespace work.darkstar.frogWin
{
    /// <summary>
    /// main game form
    /// </summary>
    public partial class FrogWinForm : Form
    {

        object? startInitLock, initLock;

        /// <summary>
        /// Constructor
        /// </summary>
        public FrogWinForm()
        {
            InitializeComponent();
        }

        /// <summary>
        /// menuItemAbout_Click - fired, when on menu item about is clicked
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">EventArgs e</param>
        private void menuItemAbout_Click(object sender, EventArgs e)
        {
            work.darkstar.frogWin.AboutBox about = new AboutBox();
            about.ShowDialog();
        }

        /// <summary>
        /// menuItemHelp_Click - fired, when on menu item about is clicked
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">EventArgs e</param>
        private void menuItemHelp_Click(object sender, EventArgs e)
        {
            Help.ShowHelp(this, Resources.help_uri);
        }

        /// <summary>
        /// menuItemExit_Click - exit frogWin form desktop application
        /// <param name="sender">object sender</param>
        /// <param name="e">EventArgs e</param>
        private void menuItemExit_Click(object sender, EventArgs e)
        {
            try
            {
                this.Close();
                this.Dispose();
            } catch { }
            Application.Exit();
        }

        private void menuItemStart_Click(object sender, EventArgs e)
        {
            frogUC.Start();
        }

        private void menuItemStop_Click(object sender, EventArgs e)
        {
            frogUC.Stop();
        }

        private void menuItemUp_Click(object sender, EventArgs e)
        {
            frogUC.KeyMoves(0);
        }

        private void menuItemLeft_Click(object sender, EventArgs e)
        {
            frogUC.KeyMoves(1);
        }

        private void menuItemRight_Click(object sender, EventArgs e)
        {
            frogUC.KeyMoves(2);
        }

        private void menuItemDown_Click(object sender, EventArgs e)
        {
            frogUC.KeyMoves(3);
        }

        private void OnKeyPress(object sender, KeyPressEventArgs kpEvArgs)
        {            
            int keyInt = (int)kpEvArgs.KeyChar;
            this.Text = this.Text + " " + keyInt.ToString();
        }
    }
}