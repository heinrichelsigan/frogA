using work.darkstar.frogWin.Controls;

namespace work.darkstar.frogWin
{
    partial class FrogWinForm
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FrogWinForm));
            this.menuStrip = new System.Windows.Forms.MenuStrip();
            this.menuItemFrogWin = new System.Windows.Forms.ToolStripMenuItem();
            this.menuItemStart = new System.Windows.Forms.ToolStripMenuItem();
            this.menuItemStop = new System.Windows.Forms.ToolStripMenuItem();
            this.menuItemLoad = new System.Windows.Forms.ToolStripMenuItem();
            this.menuItemSave = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator1 = new System.Windows.Forms.ToolStripSeparator();
            this.menuItemExit = new System.Windows.Forms.ToolStripMenuItem();
            this.menuItemMove = new System.Windows.Forms.ToolStripMenuItem();
            this.menuItemUp = new System.Windows.Forms.ToolStripMenuItem();
            this.menuItemLeft = new System.Windows.Forms.ToolStripMenuItem();
            this.menuItemRight = new System.Windows.Forms.ToolStripMenuItem();
            this.menuItemDown = new System.Windows.Forms.ToolStripMenuItem();
            this.menuItemHelpAbout = new System.Windows.Forms.ToolStripMenuItem();
            this.menuItemHelp = new System.Windows.Forms.ToolStripMenuItem();
            this.menuItemAbout = new System.Windows.Forms.ToolStripMenuItem();
            this.frogUC = new work.darkstar.frogWin.Controls.FrogLevelControl();
            this.menuStrip.SuspendLayout();
            this.SuspendLayout();
            // 
            // menuStrip
            // 
            this.menuStrip.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.menuItemFrogWin,
            this.menuItemMove,
            this.menuItemHelpAbout});
            this.menuStrip.Location = new System.Drawing.Point(0, 0);
            this.menuStrip.Name = "menuStrip";
            this.menuStrip.Size = new System.Drawing.Size(732, 24);
            this.menuStrip.TabIndex = 0;
            this.menuStrip.Text = "menuStrip1";
            this.menuStrip.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.OnKeyPress);
            // 
            // menuItemFrogWin
            // 
            this.menuItemFrogWin.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.menuItemStart,
            this.menuItemStop,
            this.menuItemLoad,
            this.menuItemSave,
            this.toolStripSeparator1,
            this.menuItemExit});
            this.menuItemFrogWin.Name = "menuItemFrogWin";
            this.menuItemFrogWin.Size = new System.Drawing.Size(62, 20);
            this.menuItemFrogWin.Text = "frogWin";
            // 
            // menuItemStart
            // 
            this.menuItemStart.Name = "menuItemStart";
            this.menuItemStart.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Alt | System.Windows.Forms.Keys.F1)));
            this.menuItemStart.Size = new System.Drawing.Size(140, 22);
            this.menuItemStart.Text = "Start";
            this.menuItemStart.ToolTipText = "Start game";
            this.menuItemStart.Click += new System.EventHandler(this.menuItemStart_Click);
            // 
            // menuItemStop
            // 
            this.menuItemStop.Name = "menuItemStop";
            this.menuItemStop.ShortcutKeyDisplayString = "";
            this.menuItemStop.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Alt | System.Windows.Forms.Keys.F7)));
            this.menuItemStop.Size = new System.Drawing.Size(140, 22);
            this.menuItemStop.Text = "Stop";
            this.menuItemStop.ToolTipText = "Stop game";
            this.menuItemStop.Click += new System.EventHandler(this.menuItemStop_Click);
            // 
            // menuItemLoad
            // 
            this.menuItemLoad.Name = "menuItemLoad";
            this.menuItemLoad.Size = new System.Drawing.Size(140, 22);
            this.menuItemLoad.Text = "Load";
            this.menuItemLoad.TextImageRelation = System.Windows.Forms.TextImageRelation.TextBeforeImage;
            this.menuItemLoad.ToolTipText = "Load game";
            // 
            // menuItemSave
            // 
            this.menuItemSave.Name = "menuItemSave";
            this.menuItemSave.Size = new System.Drawing.Size(140, 22);
            this.menuItemSave.Text = "Save";
            // 
            // toolStripSeparator1
            // 
            this.toolStripSeparator1.Name = "toolStripSeparator1";
            this.toolStripSeparator1.Size = new System.Drawing.Size(137, 6);
            // 
            // menuItemExit
            // 
            this.menuItemExit.Name = "menuItemExit";
            this.menuItemExit.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Alt | System.Windows.Forms.Keys.X)));
            this.menuItemExit.Size = new System.Drawing.Size(140, 22);
            this.menuItemExit.Text = "Exit";
            this.menuItemExit.ToolTipText = "Exit game";
            this.menuItemExit.Click += new System.EventHandler(this.menuItemExit_Click);
            // 
            // menuItemMove
            // 
            this.menuItemMove.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.menuItemUp,
            this.menuItemLeft,
            this.menuItemRight,
            this.menuItemDown});
            this.menuItemMove.Name = "menuItemMove";
            this.menuItemMove.Size = new System.Drawing.Size(49, 20);
            this.menuItemMove.Text = "Move";
            // 
            // menuItemUp
            // 
            this.menuItemUp.Name = "menuItemUp";
            this.menuItemUp.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Alt | System.Windows.Forms.Keys.Up)));
            this.menuItemUp.Size = new System.Drawing.Size(180, 22);
            this.menuItemUp.Text = "Up";
            this.menuItemUp.Click += new System.EventHandler(this.menuItemUp_Click);
            // 
            // menuItemLeft
            // 
            this.menuItemLeft.Name = "menuItemLeft";
            this.menuItemLeft.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Alt | System.Windows.Forms.Keys.Left)));
            this.menuItemLeft.Size = new System.Drawing.Size(180, 22);
            this.menuItemLeft.Text = "Left";
            this.menuItemLeft.Click += new System.EventHandler(this.menuItemLeft_Click);
            // 
            // menuItemRight
            // 
            this.menuItemRight.Name = "menuItemRight";
            this.menuItemRight.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Alt | System.Windows.Forms.Keys.Right)));
            this.menuItemRight.Size = new System.Drawing.Size(180, 22);
            this.menuItemRight.Text = "Right";
            this.menuItemRight.Click += new System.EventHandler(this.menuItemRight_Click);
            // 
            // menuItemDown
            // 
            this.menuItemDown.Name = "menuItemDown";
            this.menuItemDown.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Alt | System.Windows.Forms.Keys.Down)));
            this.menuItemDown.Size = new System.Drawing.Size(180, 22);
            this.menuItemDown.Text = "Down";
            this.menuItemDown.Click += new System.EventHandler(this.menuItemDown_Click);
            // 
            // menuItemHelpAbout
            // 
            this.menuItemHelpAbout.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.menuItemHelp,
            this.menuItemAbout});
            this.menuItemHelpAbout.Name = "menuItemHelpAbout";
            this.menuItemHelpAbout.Size = new System.Drawing.Size(80, 20);
            this.menuItemHelpAbout.Text = "Help About";
            // 
            // menuItemHelp
            // 
            this.menuItemHelp.Name = "menuItemHelp";
            this.menuItemHelp.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Alt | System.Windows.Forms.Keys.H)));
            this.menuItemHelp.Size = new System.Drawing.Size(180, 22);
            this.menuItemHelp.Text = "Help";
            this.menuItemHelp.Click += new System.EventHandler(this.menuItemHelp_Click);
            // 
            // menuItemAbout
            // 
            this.menuItemAbout.Name = "menuItemAbout";
            this.menuItemAbout.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Alt | System.Windows.Forms.Keys.A)));
            this.menuItemAbout.Size = new System.Drawing.Size(180, 22);
            this.menuItemAbout.Text = "About";
            this.menuItemAbout.Click += new System.EventHandler(this.menuItemAbout_Click);
            // 
            // frogUC
            // 
            this.frogUC.Location = new System.Drawing.Point(2, 30);
            this.frogUC.Margin = new System.Windows.Forms.Padding(0);
            this.frogUC.Name = "frogUC";
            this.frogUC.Size = new System.Drawing.Size(720, 540);
            this.frogUC.TabIndex = 1;
            // 
            // FrogWinForm
            // 
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.None;
            this.ClientSize = new System.Drawing.Size(732, 580);
            this.Controls.Add(this.frogUC);
            this.Controls.Add(this.menuStrip);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MainMenuStrip = this.menuStrip;
            this.Name = "FrogWinForm";
            this.Text = "frogWin - frogger Windows";
            this.menuStrip.ResumeLayout(false);
            this.menuStrip.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private MenuStrip menuStrip;
        private ToolStripMenuItem menuItemFrogWin;
        private ToolStripMenuItem menuItemStart;
        private ToolStripMenuItem menuItemLoad;
        private ToolStripMenuItem menuItemSave;
        private ToolStripSeparator toolStripSeparator1;
        private ToolStripMenuItem menuItemExit;
        private ToolStripMenuItem menuItemHelpAbout;
        private ToolStripMenuItem menuItemHelp;
        private ToolStripMenuItem menuItemAbout;
        private FrogLevelControl frogUC;
        private ToolStripMenuItem menuItemStop;
        private ToolStripMenuItem menuItemMove;
        private ToolStripMenuItem menuItemUp;
        private ToolStripMenuItem menuItemLeft;
        private ToolStripMenuItem menuItemRight;
        private ToolStripMenuItem menuItemDown;
    }
}