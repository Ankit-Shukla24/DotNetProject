﻿using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Data
{
    public interface ICredentialDataProvider<Credential>
    {
        public Credential GetAdminDetail(CredentialViewModel login);

        public  Task<ActionResult<string>> ChangePassword(string userName, string oldpassword, string newpassword);
    }
}
