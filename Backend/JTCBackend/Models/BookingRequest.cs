namespace JTCBackend.Models
{
    public class BookingRequest
    {
        public int Id { get; set; }
        public string? ContactName { get; set; }
        public string? Email { get; set; }
        public string? Message { get; set; }
        public DateTime EventDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Status { get; set; }
        public string? AdminResponse { get; set; }
    }
}
