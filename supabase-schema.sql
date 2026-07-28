-- =============================================
-- Birthday Invitation Website - Supabase Schema
-- Run this in your Supabase SQL Editor
-- =============================================

-- 1. RSVP Responses
CREATE TABLE IF NOT EXISTS rsvp_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name TEXT NOT NULL,
  response TEXT NOT NULL CHECK (response IN ('accept', 'decline')),
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Ceremony Members (Roses, Candles, Treasures)
CREATE TABLE IF NOT EXISTS ceremony_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('roses', 'candles', 'treasures')),
  position INTEGER NOT NULL CHECK (position BETWEEN 1 AND 18),
  name TEXT NOT NULL,
  relation TEXT NOT NULL,
  message TEXT NOT NULL,
  gift TEXT, -- only used for 'treasures'
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(category, position)
);

-- 3. Gallery Photos
CREATE TABLE IF NOT EXISTS gallery_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  alt TEXT DEFAULT '',
  storage_path TEXT, -- path in Supabase Storage (if uploaded via admin)
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. App Settings (key-value store)
CREATE TABLE IF NOT EXISTS app_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Seed Default Data
-- =============================================

-- Default music URL
INSERT INTO app_settings (key, value) VALUES
  ('music_url', 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/bd/Johann_Strauss_II_-_The_Blue_Danube_Waltz.ogg/Johann_Strauss_II_-_The_Blue_Danube_Waltz.ogg.mp3')
ON CONFLICT (key) DO NOTHING;

-- Default 18 Roses
INSERT INTO ceremony_members (category, position, name, relation, message) VALUES
  ('roses', 1,  'Maria Garcia',    'Mother',        'For the woman who gave me life and endless love.'),
  ('roses', 2,  'Roberto Garcia',  'Father',        'To my princess, forever my little girl.'),
  ('roses', 3,  'Isabella Garcia', 'Sister',        'My best friend since day one.'),
  ('roses', 4,  'Miguel Garcia',   'Brother',       'My constant protector and confidant.'),
  ('roses', 5,  'Lola Carmen',     'Grandmother',   'You are my sunshine and pride.'),
  ('roses', 6,  'Lolo Jose',       'Grandfather',   'Watching you grow has been my greatest joy.'),
  ('roses', 7,  'Tita Rosa',       'Aunt',          'Your grace and beauty inspire us all.'),
  ('roses', 8,  'Tito Marco',      'Uncle',         'May all your dreams blossom like this rose.'),
  ('roses', 9,  'Cousin Ana',      'Cousin',        'Partners in crime and forever sisters.'),
  ('roses', 10, 'Cousin Luis',     'Cousin',        'You are the light of our family.'),
  ('roses', 11, 'Andrea Santos',   'Best Friend',   'Through every laugh and every tear.'),
  ('roses', 12, 'Claire Reyes',    'Best Friend',   'A true friend for a lifetime.'),
  ('roses', 13, 'Jake Torres',     'Special Friend','Your kindness touches everyone around you.'),
  ('roses', 14, 'Nina Flores',     'Friend',        'Dancing through life together.'),
  ('roses', 15, 'Marc Lim',        'Friend',        'You make every room brighter.'),
  ('roses', 16, 'Aunt Elena',      'Aunt',          'To my godchild, my heart''s delight.'),
  ('roses', 17, 'Ninong Tony',     'Godfather',     'Always here to guide and support you.'),
  ('roses', 18, 'Ninang Grace',    'Godmother',     'My answered prayer, my beautiful gift.')
ON CONFLICT (category, position) DO NOTHING;

-- Default 18 Candles
INSERT INTO ceremony_members (category, position, name, relation, message) VALUES
  ('candles', 1,  'Maria Garcia',    'Mother',        'May your light shine brighter than any flame, illuminating the path to your greatest dreams.'),
  ('candles', 2,  'Roberto Garcia',  'Father',        'I wish you the courage to chase every dream, the wisdom to choose well, and love in every step.'),
  ('candles', 3,  'Isabella Garcia', 'Sister',        'May your life be filled with laughter, adventures, and all the things that make your heart sing.'),
  ('candles', 4,  'Miguel Garcia',   'Brother',       'I wish you success in all that you do, and the strength to overcome every challenge.'),
  ('candles', 5,  'Lola Carmen',     'Grandmother',   'May God''s blessings pour over you like golden rain, every single day of your life.'),
  ('candles', 6,  'Lolo Jose',       'Grandfather',   'I wish you a life filled with purpose, passion, and the peace that comes from knowing you are loved.'),
  ('candles', 7,  'Tita Rosa',       'Aunt',          'May every candle you blow represent a dream already on its way to coming true.'),
  ('candles', 8,  'Tito Marco',      'Uncle',         'I wish you the boldness to be yourself, unapologetically and beautifully.'),
  ('candles', 9,  'Cousin Ana',      'Cousin',        'May your future be as bright and beautiful as you are tonight.'),
  ('candles', 10, 'Cousin Luis',     'Cousin',        'I wish you happiness in every season and love in every reason.'),
  ('candles', 11, 'Andrea Santos',   'Best Friend',   'May this year be the beginning of the most beautiful chapter of your story.'),
  ('candles', 12, 'Claire Reyes',    'Best Friend',   'I wish you adventures that take your breath away and memories that last forever.'),
  ('candles', 13, 'Jake Torres',     'Special Friend','May you always find your way back to joy, no matter where life takes you.'),
  ('candles', 14, 'Nina Flores',     'Friend',        'I wish you a heart full of gratitude and eyes that see beauty everywhere.'),
  ('candles', 15, 'Marc Lim',        'Friend',        'May your 18th year be your most extraordinary one yet.'),
  ('candles', 16, 'Aunt Elena',      'Aunt',          'I wish you the wisdom to know your worth and the grace to carry it always.'),
  ('candles', 17, 'Ninong Tony',     'Godfather',     'May every dream you have be the foundation for the incredible woman you are becoming.'),
  ('candles', 18, 'Ninang Grace',    'Godmother',     'I wish you a life overflowing with love, laughter, and the grace to handle whatever comes your way.')
ON CONFLICT (category, position) DO NOTHING;

-- Default 18 Treasures
INSERT INTO ceremony_members (category, position, name, relation, message, gift) VALUES
  ('treasures', 1,  'Maria Garcia',    'Mother',        'The most precious gift of all — unconditional love that has shaped who you are.',         'A Mother''s Love'),
  ('treasures', 2,  'Roberto Garcia',  'Father',        'Years of guidance, lessons, and quiet support that have prepared you for the world.',     'A Father''s Wisdom'),
  ('treasures', 3,  'Isabella Garcia', 'Sister',        'A bond that time and distance can never break, your forever confidant.',                  'Lifelong Sisterhood'),
  ('treasures', 4,  'Miguel Garcia',   'Brother',       'A promise to always stand by your side and have your back.',                              'A Brother''s Protection'),
  ('treasures', 5,  'Lola Carmen',     'Grandmother',   'The stories, traditions, and values passed down with endless love.',                      'Family Legacy'),
  ('treasures', 6,  'Lolo Jose',       'Grandfather',   'A lifetime of prayers said for your happiness and well-being.',                           'Prayers & Blessings'),
  ('treasures', 7,  'Tita Rosa',       'Aunt',          'A shimmering piece to adorn your beauty as you shine in this world.',                     'Golden Necklace'),
  ('treasures', 8,  'Tito Marco',      'Uncle',         'Resources to explore the world and find yourself in its vast beauty.',                    'Travel Fund'),
  ('treasures', 9,  'Cousin Ana',      'Cousin',        'A beautiful journal to capture every thought, dream, and adventure.',                     'Friendship Journal'),
  ('treasures', 10, 'Cousin Luis',     'Cousin',        'A year of music for every mood, every moment, every memory.',                             'Spotify Premium'),
  ('treasures', 11, 'Andrea Santos',   'Best Friend',   'A day of pampering because you deserve to be treated like the queen you are.',            'Spa & Wellness Day'),
  ('treasures', 12, 'Claire Reyes',    'Best Friend',   'To hold all the treasures — both given and gathered — in your life.',                     'Personalized Jewelry Box'),
  ('treasures', 13, 'Jake Torres',     'Special Friend','A session to capture your beautiful self at this incredible milestone.',                   'Photography Session'),
  ('treasures', 14, 'Nina Flores',     'Friend',        'Scents that capture your elegance, warmth, and unforgettable spirit.',                    'Perfume Collection'),
  ('treasures', 15, 'Marc Lim',        'Friend',        'A curated collection of inspiring stories to fuel your wildest ambitions.',                'Book of Dreams'),
  ('treasures', 16, 'Aunt Elena',      'Aunt',          'Classic elegance for the remarkable young woman you have become.',                         'Pearl Earrings'),
  ('treasures', 17, 'Ninong Tony',     'Godfather',     'An investment in your future, because your potential knows no limits.',                    'Educational Fund'),
  ('treasures', 18, 'Ninang Grace',    'Godmother',     'The most powerful gift — a heart-full of prayers for your beautiful life ahead.',          'A Blessing & A Prayer')
ON CONFLICT (category, position) DO NOTHING;

-- =============================================
-- Row Level Security (RLS) Policies
-- =============================================

-- Enable RLS on all tables
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ceremony_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT rsvp responses (guests submitting)
CREATE POLICY "Anyone can submit RSVP" ON rsvp_responses
  FOR INSERT WITH CHECK (true);

-- Allow anyone to READ rsvp (admin reads them client-side with anon key)
CREATE POLICY "Anyone can read RSVP" ON rsvp_responses
  FOR SELECT USING (true);

-- Allow anyone to READ ceremony_members
CREATE POLICY "Anyone can read ceremony_members" ON ceremony_members
  FOR SELECT USING (true);

-- Allow anyone to UPDATE ceremony_members (admin uses anon key)
CREATE POLICY "Anyone can update ceremony_members" ON ceremony_members
  FOR UPDATE USING (true);

-- Allow anyone to READ gallery_photos
CREATE POLICY "Anyone can read gallery_photos" ON gallery_photos
  FOR SELECT USING (true);

-- Allow anyone to INSERT/UPDATE/DELETE gallery_photos (admin)
CREATE POLICY "Anyone can manage gallery_photos" ON gallery_photos
  FOR ALL USING (true);

-- Allow anyone to READ app_settings
CREATE POLICY "Anyone can read app_settings" ON app_settings
  FOR SELECT USING (true);

-- Allow anyone to UPDATE app_settings (admin)
CREATE POLICY "Anyone can update app_settings" ON app_settings
  FOR UPDATE USING (true);

-- =============================================
-- Storage Bucket for Gallery Photos
-- =============================================
-- NOTE: Run this separately in Supabase Dashboard > Storage > New Bucket
-- Bucket name: "gallery"
-- Make it PUBLIC so images are accessible without auth
