using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YoutubeClone.Infrastructure.Services
{
    public class JwtTokenGeneratorSettings
    {
        public string Key { get; set; } = null!;
        public long LifespanInDays { get; set; }
    }
}
