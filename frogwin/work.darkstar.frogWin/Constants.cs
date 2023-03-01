using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace work.darkstar.frogWin
{
    internal static class Constants
    {
        internal const int MIN_LEVEL = 1;
        internal const int MAX_LEVEL = 5;
        internal const int QSTARTINT = 250;
        internal const int INTERVALL = 2500;

        internal static readonly char[] CHARS = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j' };
        internal static readonly string[] MOVES_STRS = {
            "1a", "1b", "1c", "1d", "1e", "1f", "1g", "1h", "1i", "1j",
            "2a", "2b", "2c", "2d", "2e", "2f", "2g", "2h", "2i", "2j",
            "3a", "3b", "3c", "3d", "3e", "3f", "3g", "3h", "3i", "3j",
            "4a", "4b", "4c", "4d", "4e", "4f", "4g", "4h", "4i", "4j",
            "5a", "5b", "5c", "5d", "5e", "5f", "5g", "5h", "5i", "5j",
            "6a", "6b", "6c", "6d", "6e", "6f", "6g", "6h", "6i", "6j",
            "7a", "7b", "7c", "7d", "7e", "7f", "7g", "7h", "7i", "7j",
            "8a", "8b", "8c", "8d", "8e", "8f", "8g", "8h", "8i", "8j"
        };


        internal const string CRLF = "\r\n";
    }
}
