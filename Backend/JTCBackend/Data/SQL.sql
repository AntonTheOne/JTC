INSERT INTO Posts(Title, Content, ImageUrl, CreatedAT)
VALUES ('Test Title', 'Lite test data för content', 'https://placehold.co/600x400', '2026-04-11')

INSERT INTO Gigs (Venue, City, Date, TicketUrl)
VALUES ('Trädgårn', 'Göteborg', '2026-05-15', 'https://tickster.com/test')

INSERT INTO Members (Name, Role, Bio, ImageUrl)
VALUES ('Jan', 'Gitarr', 'Grundare av bandet och huvudgitarrist', 'https://placehold.co/300x300')

INSERT INTO BookingRequests (ContactName, Email, Message, EventDate, CreatedAt, Status, AdminResponse)
VALUES ('Anna Arrangör', 'anna@test.se', 'Hej! Kan ni spela på vårt event?', '2026-06-20', GETDATE(), 'Pending', NULL)

INSERT INTO Users (Username, PasswordHash)
VALUES ('admin', 'temporärt_lösenord')


INSERT INTO Posts (Title, Content, ImageUrl, CreatedAt)
VALUES 
('Test Title 2', 'Lite test data för content', 'https://placehold.co/600x400', '2026-04-10'),
('Test Title 3', 'Lite test data för content', 'https://placehold.co/600x400', '2026-04-9'),
('Test Title 4', 'Lite test data för content', 'https://placehold.co/600x400', '2026-04-8')

INSERT INTO GalleryImages (ImageURL, Caption, CreatedAT)
VALUES
('https://placehold.co/600x400', 'Test Bild för galleri', '2026-04-10'),
('https://placehold.co/600x400', 'Test Bild för galleri', '2026-04-10'),
('https://placehold.co/600x400', 'Test Bild för galleri', '2026-04-10'),
('https://placehold.co/600x400', 'Test Bild för galleri', '2026-04-10')