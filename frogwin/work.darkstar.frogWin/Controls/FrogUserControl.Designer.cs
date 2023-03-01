namespace work.darkstar.frogWin.Controls
{
    partial class FrogUserControl
    {
        /// <summary> 
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
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

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {            
            this.frogFieldControls = new FrogFieldControl[10, 10];
            this.SuspendLayout();
            // 
            // frogFieldControls
            // 
            for (int row = 0; row < 10; row++)
            {
                for (int col = 0; col < 10; col++)
                {
                    FrogFieldControl frogField = new FrogFieldControl();
                    frogField.Name = "frogField" + row + col;
                    switch ((col+row)%2)
                    {
                        case 0:
                            frogField.BackColor = Color.GhostWhite;
                            break;
                        default: frogField.BackColor = Color.DarkGray; 
                            break;
                    }                    
                    frogField.Size = new System.Drawing.Size(72, 54);
                    frogField.TabIndex = 100 + row * 10 + col;
                    frogField.Location = new Point(col * 72, row * 54);
                    frogFieldControls[row, col] = frogField;
                }
            }
            // 
            // FrogUserControl
            // 
            this.Padding = new System.Windows.Forms.Padding(0, 0, 0, 0);
            this.Margin = new System.Windows.Forms.Padding(0, 0, 0, 0);
            // this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            // this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            for (int row = 0; row < 10; row++)
            {
                for (int col = 0; col < 10; col++)
                {
                    this.Controls.Add(frogFieldControls[row, col]);
                }
            }
            this.Name = "FrogUserControl";
            this.Size = new System.Drawing.Size(720, 540);
            this.ResumeLayout(false);

        }

        #endregion

        private FrogFieldControl[,] frogFieldControls;

    }
}
