using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YoutubeClone.Infrastructure.Services
{
    public interface IFileService
    {
        Task<Uri> UploadAsync(string path, Stream fileStream);
    }
}
