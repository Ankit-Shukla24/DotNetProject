using System;
using System.Net.Mail;
using backend.Models;

namespace backend.Validation
{
	public static class validator
	{
        static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return false;
            }

            try
            {
                var addr = new MailAddress(email);
                return true;
            }
            catch
            {
                return false;
            }
        }
		public static bool CheckCustomer(Customer customer)
		{

			if (customer == null)
			{
				Console.WriteLine("The customer is NULL");
				return false;
			}
			else if (customer.PhoneNumber==null||customer.PhoneNumber.Length!=10)
			{

				Console.WriteLine("Length of phone number is incorrect");
				return false;
			}
			else if (customer.DateOfbirth==null|| DateTime.Now.Subtract((DateTime)customer.DateOfbirth).CompareTo(DateTime.Now-DateTime.Now.AddYears(-18))==-1)
			{
				Console.WriteLine("Age less than 18 years");
				return false;
			}
			else if (customer.EmailId==null|| IsValidEmail(customer.EmailId)==false)
			{
				Console.WriteLine("Invalid email id");
				return false;
			}
			else if(customer.Address==null)
			{
				Console.WriteLine("Input valid address");
				return false;
			}
			else if(customer.FirstName==null)
			{
				Console.WriteLine("Input firstname");
				return false;
			}
			return true;

		}

		public static bool CheckAccount(Account account) {
		
			if(account == null)
			{
				Console.WriteLine("Account is null");
				return false;
			}
			else if(account.CustomerId==null)
			{
				Console.WriteLine("Customer id is null");
				return false;
			}
			else if(account.Balance==null|| account.Balance<0)
			{
				Console.WriteLine("Account balance cannot be less than 0");
				return false;
			}
			else if(account.CardNo==null || account.CardNo.Length!=12)
			{
				Console.WriteLine("Card number should be of length 12");
				return false;
			}
			else if (account.Pin==null|| account.Pin.ToString().Length!=4)
			{
				Console.WriteLine("Pin should be of 4 digits");
				return false;
			}
			else if(account.City ==null) {
				Console.WriteLine("Invalid city");
				return false;
					}
			else if(account.AccountType==null)
			{
				Console.WriteLine("Ivalid account type");
				return false;
			}
			return true;
		}

		}
	}


