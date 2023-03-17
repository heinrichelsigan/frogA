using Microsoft.VisualBasic.Logging;
using Microsoft.VisualBasic;
using NLog;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Media;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using work.darkstar.frogWin;
using System.Reflection.Emit;
using System.Security.AccessControl;


namespace work.darkstar.frogWin.Controls
{
    [Serializable]
    public partial class MoveControl : UserControl
    {

        public int ImgType { get; set; } = -1;
        public Image? BgImage { get => this.BackgroundImage; set => this.BackgroundImage = value; } 

        /// <summary>
        /// Default void Constructor
        /// </summary>
        public MoveControl()
        {           
            components = new System.ComponentModel.Container();
            InitializeComponent();

        }

        public MoveControl(Image anImage) : this()
        {
            if (anImage == null)
            {
                this.BackgroundImage = anImage;
            }
        }

        public MoveControl(int imgType) : this()
        {
            this.ImgType = imgType;
            if (ImgType == 1)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.car1;
            }
            else if (ImgType == 2)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.skateboard0;
            }
            else if (ImgType == 3)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.dog0;
            }
            else if (ImgType == 4)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.djinn;
            }
            else if (ImgType == 5)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.dragon;
            }
            else if (ImgType == 6)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.wood0b;
            }
            else if (ImgType == 7)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.wood0t;
            }
            else if (ImgType == 8)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.car0crashed;
            }
            else if (ImgType == 9)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.car1crashed;
            }
            else if (ImgType == 10)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.street7m;
            }
            else
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.car0;
            }

        }

    }
}

