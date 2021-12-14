namespace YoutubeClone.DTO
{
    public class Page<T>
    {
        public long? ContinuationToken { get; set; }
        public IEnumerable<T> Rows { get; set; }
    }
}
