using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace work.darkstar.frogWin.Models
{
    internal class Game
    {
        public bool Started { get; set; } = false;
        public bool Over { get; set; } = false;
        public uint Ticks { get; set; } = 0;
        public int Level { get; set; }  = 0;
        public int CurrentFrog { get; set; } = 0;
        public int FrogCounter { get; set; } = 4;
        public int FrogInGoal { get; set; } = 0;

        private char[] chArStreet0 = new char[3];
        public char[] CharStreet0 { get => chArStreet0; set => chArStreet0 = value; }

        private char[] chArStreet1 = new char[4];
        public char[] CharStreet1 { get => chArStreet1; set => chArStreet1 = value; }

        private char[] chArStreet4m = new char[3];
        public char[] CharStreet4m { get => chArStreet4m; set => chArStreet4m = value; }

        private char[] chArRiver0 = new char[4];
        public char[] CharRiver0 { get => chArRiver0; set => chArRiver0 = value; }

        private char[] chArRiver1 = new char[4];
        public char[] CharRiver1 { get => chArRiver1; set => chArRiver1 = value; }

        public Game()
        {
            InitMoveItems();
        }


        public void InitMoveItems()
        {
            chArStreet0[0] = 'a';
            chArStreet0[1] = 'e';
            chArStreet0[2] = 'i';

            chArStreet1[0] = 'b';
            chArStreet1[1] = 'd';
            chArStreet1[2] = 'g';
            chArStreet1[3] = 'i';

            chArStreet4m[0] = 'a';
            chArStreet4m[1] = 'd';
            chArStreet4m[2] = 'g';

            chArRiver0[0] = 'f';
            chArRiver0[1] = 'g';
            chArRiver0[2] = 'h';
            chArRiver0[3] = 'i';

            chArRiver1[0] = 'b';
            chArRiver1[1] = 'c';
            chArRiver1[2] = 'g';
            chArRiver1[3] = 'h';
        }


        public uint LoopTick()
        {
            int chCnt = 0;            
            foreach (char ch in chArStreet0)
            {
                int chIVal = (int)ch;
                if (ch != 'j')
                    chArStreet0[chCnt] = (char)(++chIVal);
                else
                    chArStreet0[chCnt] = 'a';
                chCnt++;
            }
            chCnt = 0;
            for (int chCnt1 = 0; chCnt1 < chArStreet1.Length; chCnt1++) 
            // foreach (char chs1 in chArStreet1)
            {
                char chs1 = chArStreet1[chCnt1];
                int chIVal = (int)chs1;
                chIVal--;
                if (chs1 != 'a')
                    chArStreet1[chCnt1] = (char)(chIVal);
                else
                    chArStreet1[chCnt1] = 'j';
            }
            chCnt = 0;
            foreach (char ch in chArStreet4m)
            {
                int chIVal = (int)ch;
                if (ch != 'j')
                    chArStreet4m[chCnt] = (char)(++chIVal);
                else
                    chArStreet4m[chCnt] = 'a';
                chCnt++;
            }
            chCnt = 0;
            foreach (char ch in chArRiver0)
            {
                int chIVal = (int)ch;
                if (ch != 'j')
                    chArRiver0[chCnt] = (char)(++chIVal);
                else
                    chArRiver0[chCnt] = 'a';
                chCnt++;
            }
            chCnt = 0;
            foreach (char ch in chArRiver1)
            {
                int chIVal = (int)ch;
                if (ch != 'a')
                    chArRiver1[chCnt] = (char)(--chIVal);
                else
                    chArRiver1[chCnt] = 'j';
                chCnt++;
            }
            Ticks++;

            return Ticks;
        }
    }
}
