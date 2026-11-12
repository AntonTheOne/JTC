// Skapar en BCrypt-hash av ett lösenord, till Users-tabellen.
// Användning: dotnet run --project Backend/HashGenerator -- "mitt-lösenord"
if (args.Length == 0)
{
    Console.WriteLine("Ange lösenordet som argument: dotnet run -- \"mitt-lösenord\"");
    return 1;
}

Console.WriteLine(BCrypt.Net.BCrypt.HashPassword(args[0]));
return 0;
