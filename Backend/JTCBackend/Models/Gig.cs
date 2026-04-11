namespace JTCBackend.Models
{
    public class Gig
    {
        public int Id { get; set; }
        public string? Venue { get; set; }
        public string? City { get; set; }
        public DateTime? Date { get; set; }
        public string? TicketUrl { get; set; }
    }
}
