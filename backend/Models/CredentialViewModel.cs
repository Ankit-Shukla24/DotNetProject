namespace backend.Models
{
    public class CredentialViewModel
    {
        public CredentialViewModel()
        {
        }

        public CredentialViewModel(string userName, string? password)
        {
            UserName = userName;
            Password = password;
        }

        public string UserName { get; set; } 

        public string? Password { get; set; }
    }
}
