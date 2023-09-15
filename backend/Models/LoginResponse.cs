namespace backend.Models
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public string  CustomerId { get; set; }
        
        public string UserType { get; set; }
        public string UserId { get; set; }
    }
}
