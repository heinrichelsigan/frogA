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
    public partial class FrogFieldControl : UserControl
    {
        
        #region ctor

        /// <summary>
        /// Default void Constructor
        /// </summary>
        public FrogFieldControl()
        {           
            components = new System.ComponentModel.Container();
            InitializeComponent();
        }

        /// <summary>
        /// Constructor with Level
        /// </summary>
        /// <param name="frogType">int for frog type</param>
        public FrogFieldControl(int frogType) : this()
        {            
            switch (frogType) 
            {
                case 0: this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.froga; break;
                case 1: this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.frogb; break;
                case 2: this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.frogc; break;
                case 3: this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.frogd; break;
                default: this.BackgroundImage = global::work.darkstar.frogWin.Properties.Resources.froga; break;
            }
        }

        #endregion ctor

    }
}

