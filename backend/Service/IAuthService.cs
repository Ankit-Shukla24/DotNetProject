﻿using backend.Models;

namespace backend.Service
{
    public interface IAuthService
    {
        public Credential GetAdminDetail(CredentialViewModel login);
    }
}
