namespace YoutubeClone.DTO
{
    public class Page<T>
    {
        public DateTime? ContinuationToken { get; set; }
        public IEnumerable<T> Rows { get; set; }
    }
}
