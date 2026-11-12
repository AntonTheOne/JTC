-- Exempeldata för lokal utveckling. Kör efter "dotnet ef database update".
-- Allt här är påhittat testinnehåll, inte bandets riktiga spelningar.
-- Admin-inloggning lokalt: användarnamn "admin", lösenord "jtc-admin".
-- Byt lösenord: skapa en ny hash med HashGenerator (se README) och uppdatera Users.

INSERT INTO Users (Username, PasswordHash)
VALUES ('admin', '$2a$11$ABjZV8JtRY7OJEKUjuytc.hzVwo0WvNUammwYxKu3oLCWLmFTsFo2');

INSERT INTO Posts (Title, Content, ImageUrl, CreatedAt)
VALUES
('Ny hemsida på plats', 'Nu har vi en egen sajt. Här hittar du kommande spelningar, bilder och kan boka oss till ditt event.', 'https://placehold.co/600x400', '2026-04-11'),
('Repetitionerna är igång', 'Vi har lagt in några nya låtar i repertoaren inför säsongen. Kom och lyssna!', 'https://placehold.co/600x400', '2026-04-10'),
('Tack för i lördags', 'Stort tack till alla som kom och dansade. Fler bilder finns i galleriet.', 'https://placehold.co/600x400', '2026-04-08');

INSERT INTO Gigs (Venue, City, Date, TicketUrl)
VALUES
('Exempelscenen', 'Göteborg', '2027-02-20', NULL),
('Exempelpuben', 'Kungälv', '2027-03-13', NULL);

INSERT INTO Members (Name, Role, Bio, ImageUrl)
VALUES ('Jan', 'Gitarr', 'Grundare av bandet och huvudgitarrist.', 'https://placehold.co/300x300');

INSERT INTO GalleryImages (ImageUrl, Caption, CreatedAt)
VALUES
('https://placehold.co/600x400', 'Exempelbild från en spelning', '2026-04-10'),
('https://placehold.co/600x400', 'Exempelbild från replokalen', '2026-04-10');

INSERT INTO BookingRequests (ContactName, Email, Message, EventDate, CreatedAt, Status, AdminResponse)
VALUES ('Anna Exempel', 'anna@example.com', 'Hej! Kan ni spela på vårt företagsevent?', '2027-06-20', GETDATE(), 'Pending', NULL);
