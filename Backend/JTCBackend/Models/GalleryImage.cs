namespace JTCBackend.Models
{
    public class GalleryImage
    {
        public int Id { get; set; }
        public string? ImageUrl { get; set; }
        public string? Caption { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
