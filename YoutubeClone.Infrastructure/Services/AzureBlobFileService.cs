using Azure.Storage.Blobs;

namespace YoutubeClone.Infrastructure.Services
{
    public class AzureBlobFileService : IFileService
    {
        private readonly BlobContainerClient blobContainerClient;

        public AzureBlobFileService(BlobContainerClient blobContainerClient)
        {
            this.blobContainerClient = blobContainerClient;
            this.blobContainerClient.CreateIfNotExists();
        }

        public async Task<Uri> UploadAsync(string path, Stream fileStream)
        {
            var blobClient = blobContainerClient.GetBlobClient(path);

            await blobClient.UploadAsync(fileStream);

            return blobClient.Uri;            
        }
    }
}
