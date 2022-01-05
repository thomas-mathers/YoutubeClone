namespace YoutubeClone.DTO
{
    public class Page<T>
    {
        public DateTime? ContinueToken { get; set; }
        public long TotalRows { get; set; }
        public IEnumerable<T> Rows { get; set; } = Enumerable.Empty<T>();
    }
}
