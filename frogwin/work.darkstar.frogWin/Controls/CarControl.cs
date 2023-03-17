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


namespace work.darkstar.frogWin.Controls
{
    [Serializable]
    public partial class CarControl : MoveControl
    {

        public int CarType { get; set; } = 0;

        /// <summary>
        /// Default void Constructor
        /// </summary>
        public CarControl()
        {           
            components = new System.ComponentModel.Container();
            InitializeComponent();

        }

        public CarControl(Image anImage) : this()
        {
            if (anImage == null)
            {
                this.BackgroundImage = anImage;
            }
        }

        public CarControl(int carType) : this()
        {
            if (carType == 0)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.car0;
            }
            else if (carType == 1)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.car1;
            }
            else if (carType == 2)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.skateboard0;
            }
            else if (carType == 3)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.dog0;
            }
            else if (carType == 4)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.djinn;
            }
            else if (carType == 5)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.dragon;
            }
            else if (carType == 6)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.wood0b;
            }
            else if (carType == 7)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.wood0t;
            }
            else if (carType == 8)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.car0crashed;
            }
            else if (carType == 9)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.car1crashed;
            }
            else if (carType == 10)
            {
                this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.street7m;
            }
            else
            {
                throw new ArgumentException("Illegal type = " + carType);
            }
        }


    }
}

