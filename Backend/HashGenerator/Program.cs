using BCrypt.Net;

string lösenord = "Admin";
string hash = BCrypt.Net.BCrypt.HashPassword(lösenord);
Console.WriteLine(hash);