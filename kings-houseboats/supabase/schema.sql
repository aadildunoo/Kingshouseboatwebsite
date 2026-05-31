-- Kings Houseboats Booking System Schema

-- Create custom enum types
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'partial', 'paid', 'refunded');

-- 1. Rooms Table
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2) NOT NULL,
  capacity_adults INTEGER NOT NULL DEFAULT 2,
  capacity_children INTEGER NOT NULL DEFAULT 0,
  amenities JSONB DEFAULT '[]'::jsonb,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Guests Table
CREATE TABLE guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT,
  city TEXT,
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Bookings Table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guest_id UUID REFERENCES guests(id) ON DELETE CASCADE,
  room_id UUID REFERENCES rooms(id) ON DELETE RESTRICT,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  adults INTEGER NOT NULL DEFAULT 1,
  children INTEGER NOT NULL DEFAULT 0,
  total_price DECIMAL(10,2) NOT NULL,
  status booking_status DEFAULT 'pending',
  payment_status payment_status DEFAULT 'pending',
  reservation_number TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT check_dates CHECK (check_out > check_in)
);

-- 4. Payments Table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  method TEXT, -- e.g., 'credit_card', 'upi', 'bank_transfer'
  status TEXT DEFAULT 'pending', -- 'pending', 'success', 'failed'
  transaction_ref TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Blocked Dates Table (for manual blocks, maintenance, etc.)
CREATE TABLE blocked_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT check_blocked_dates CHECK (end_date >= start_date)
);

-- 6. Pricing Rules Table (for seasonal pricing, weekends, etc.)
CREATE TABLE pricing_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  price_modifier DECIMAL(10,2) NOT NULL, -- e.g., 1.5 for 50% increase, or an absolute value if preferred
  is_percentage BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT check_pricing_dates CHECK (end_date >= start_date)
);

-- RLS (Row Level Security) Setup
-- Enable RLS on all tables
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_rules ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (Read-only for rooms)
CREATE POLICY "Public can view rooms" ON rooms FOR SELECT USING (true);
CREATE POLICY "Public can view blocked dates" ON blocked_dates FOR SELECT USING (true);
CREATE POLICY "Public can view pricing rules" ON pricing_rules FOR SELECT USING (true);

-- Insert Initial Room Data based on the website
INSERT INTO rooms (name, description, base_price, capacity_adults, capacity_children, amenities, image_url) VALUES
('Royal Suite', 'Our most exquisite room with panoramic lake and mountain views.', 15000, 2, 1, '["Panoramic Lake & Mountain View", "King-Size Bed", "Hand-Carved Walnut Ceiling", "Private Seating Area", "En-suite Bathroom"]', '/images/rooms/royal-suite.jpg'),
('Deluxe Lake View', 'Twin-bedded room overlooking the tranquil Nigeen Lake.', 12000, 2, 0, '["Direct Lake View", "Twin Beds", "Traditional Woodwork Ceiling", "Kashmiri Carpet", "Writing Desk"]', '/images/rooms/deluxe-lake-view.jpg'),
('Heritage Room', 'A spacious room blending authentic Kashmiri heritage with comfort.', 10000, 2, 1, '["Heritage Wood Paneling", "Double Bed", "Cozy Sitting Area", "Lake-Facing Windows", "Traditional Tapestries"]', '/images/rooms/heritage-room.png'),
('Family Room', 'Spacious room accommodating parents and children comfortably.', 18000, 2, 2, '["Multiple Beds", "Spacious Layout", "Lake Views", "Child-Friendly", "En-suite Bathroom"]', '/images/rooms/family-room.png');
