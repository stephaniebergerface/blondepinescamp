import React, { useState, useEffect } from 'react';
import { ChevronRight, LogOut, Calendar, MapPin, HelpCircle, Flame, Map } from 'lucide-react';

const BlondePinesSite = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [currentPage, setCurrentPage] = useState('rsvp');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchName, setSearchName] = useState('');
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [rsvpFormData, setRsvpFormData] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Guest data from CSV
  const guestList = [
    { fullName: "Alex Kuehr", groupName: "Alex and Dustin", type: "Couple" },
    { fullName: "Dustin Plowman", groupName: "Alex and Dustin", type: "Couple" },
    { fullName: "Andrew Marquis", groupName: "Andrew and Danielle", type: "Couple" },
    { fullName: "Danielle Donovan", groupName: "Andrew and Danielle", type: "Couple" },
    { fullName: "Argerie Villalobos", groupName: "Argerie and Taylor", type: "Couple" },
    { fullName: "Taylor Fearing", groupName: "Argerie and Taylor", type: "Couple" },
    { fullName: "Bianca Roses", groupName: "Bianca and Mael", type: "Couple" },
    { fullName: "Mael Girin", groupName: "Bianca and Mael", type: "Couple" },
    { fullName: "Caleb Dufresne", groupName: "Caleb and Craig", type: "Couple" },
    { fullName: "Craig Bing", groupName: "Caleb and Craig", type: "Couple" },
    { fullName: "Adrienne Hotwife", groupName: "Carli and Adrienne", type: "Couple" },
    { fullName: "Carli Raben", groupName: "Carli and Adrienne", type: "Couple" },
    { fullName: "Genevieve Mushaluk", groupName: "Genevieve and Mark", type: "Couple" },
    { fullName: "Mark Tallon", groupName: "Genevieve and Mark", type: "Couple" },
    { fullName: "Greg English", groupName: "Greg and Levi", type: "Couple" },
    { fullName: "Levi Luck", groupName: "Greg and Levi", type: "Couple" },
    { fullName: "Tod Mullen", groupName: "Hazel and Tod", type: "Couple" },
    { fullName: "Hazel Mahony", groupName: "Hazel and Tod", type: "Couple" },
    { fullName: "Ben Hoerner", groupName: "Jess and Ben", type: "Couple" },
    { fullName: "Jessica Hoerner", groupName: "Jess and Ben", type: "Couple" },
    { fullName: "Jessica Florio", groupName: "Jess and Larry", type: "Couple" },
    { fullName: "Larry Florio", groupName: "Jess and Larry", type: "Couple" },
    { fullName: "Etan Fraiman", groupName: "Jordan and Etan", type: "Couple" },
    { fullName: "Jordan Hellman", groupName: "Jordan and Etan", type: "Couple" },
    { fullName: "Alex Cuenca", groupName: "Julie and Alex", type: "Couple" },
    { fullName: "Julie Murphy", groupName: "Julie and Alex", type: "Couple" },
    { fullName: "Derek Kamillashusband", groupName: "Kamila and Derek", type: "Couple" },
    { fullName: "Kamila Karthigesu", groupName: "Kamila and Derek", type: "Couple" },
    { fullName: "Kate Palestina", groupName: "Kate and Rob", type: "Couple" },
    { fullName: "Rob Palestina", groupName: "Kate and Rob", type: "Couple" },
    { fullName: "Tom Shanahan", groupName: "Kelcey and Tom", type: "Couple" },
    { fullName: "Kelcey Shanahan", groupName: "Kelcey and Tom", type: "Couple" },
    { fullName: "Gabby Bellettieri", groupName: "Kellie and Gabby", type: "Couple" },
    { fullName: "Kellie Nalbandian", groupName: "Kellie and Gabby", type: "Couple" },
    { fullName: "Kyle Fraser", groupName: "Kyle and Maggie", type: "Couple" },
    { fullName: "Maggie Fraser", groupName: "Kyle and Maggie", type: "Couple" },
    { fullName: "Jack Lykins", groupName: "Leah and Jack", type: "Couple" },
    { fullName: "Leah Lykins", groupName: "Leah and Jack", type: "Couple" },
    { fullName: "Emile McCormick", groupName: "Madeline and Emile", type: "Couple" },
    { fullName: "Madeline Morrissey", groupName: "Madeline and Emile", type: "Couple" },
    { fullName: "Darius Jankus", groupName: "Marc and Darius", type: "Couple" },
    { fullName: "Marc Sutton", groupName: "Marc and Darius", type: "Couple" },
    { fullName: "John Dey", groupName: "Philip and John", type: "Couple" },
    { fullName: "Philip Tizzani", groupName: "Philip and John", type: "Couple" },
    { fullName: "Max Veenema", groupName: "Ron and Max", type: "Couple" },
    { fullName: "Ron Ketelhut", groupName: "Ron and Max", type: "Couple" },
    { fullName: "Sravya Yeleswarapu", groupName: "Sravya and Varun", type: "Couple" },
    { fullName: "Varun Pandit", groupName: "Sravya and Varun", type: "Couple" },
    { fullName: "Teeny Chirichillo", groupName: "Stephanie and Teeny", type: "Couple" },
    { fullName: "Stephanie Berger", groupName: "Stephanie and Teeny", type: "Couple" },
    { fullName: "Jake Gleghorn", groupName: "Taylor and Jake", type: "Couple" },
    { fullName: "Taylor Dunn", groupName: "Taylor and Jake", type: "Couple" },
    { fullName: "Michael Cheatham", groupName: "Taylor and Michael", type: "Couple" },
    { fullName: "Taylor Scott Collins", groupName: "Taylor and Michael", type: "Couple" },
    { fullName: "Thomas Krottinger", groupName: "Thomas and Michael Joyce", type: "Couple" },
    { fullName: "Michael Joyce", groupName: "Thomas and Michael Joyce", type: "Couple" },
    { fullName: "Shreya Madhavaram", groupName: "Tom and Shreya", type: "Couple" },
    { fullName: "Tom Wooten", groupName: "Tom and Shreya", type: "Couple" },
    { fullName: "Sara Cook", groupName: "Vikki and Sara", type: "Couple" },
    { fullName: "Vikki Brown", groupName: "Vikki and Sara", type: "Couple" },
    { fullName: "Alyssa Owens", groupName: "Alyssa", type: "Solo" },
    { fullName: "Melissa Beck", groupName: "Melissa", type: "Solo" },
    { fullName: "Rachael Wildes", groupName: "Rachael", type: "Solo" },
    { fullName: "Aaron Schwindt", groupName: "Aaron", type: "Solo" },
    { fullName: "Lenny Raney", groupName: "Lenny", type: "Solo" },
    { fullName: "Lily Wolking", groupName: "Lily", type: "Solo" },
    { fullName: "Ariel Ruttenberg", groupName: "Ariel", type: "Solo" },
    { fullName: "Emily Martens", groupName: "Emily M.", type: "Solo" },
    { fullName: "Abby Snyder", groupName: "Abby", type: "Solo" },
    { fullName: "Caroline Lewis", groupName: "Caroline", type: "Solo" },
    { fullName: "Cel", groupName: "Celestine", type: "Solo" },
    { fullName: "Erica Langhoff", groupName: "Erica", type: "Solo" },
    { fullName: "Meghna Kedia", groupName: "Meghna", type: "Solo" },
    { fullName: "Leland Linman", groupName: "Leland", type: "Solo" },
    { fullName: "Aislinn Cunningham", groupName: "Aislinn", type: "Solo" },
    { fullName: "Elisha Willems", groupName: "Elisha", type: "Solo" },
    { fullName: "Hallie Dietsch", groupName: "Hallie", type: "Solo" },
    { fullName: "Henry Heaton", groupName: "Henry", type: "Solo" },
    { fullName: "Jill Dankel", groupName: "Jill", type: "Solo" },
    { fullName: "Karissa Harris", groupName: "Karissa", type: "Solo" },
    { fullName: "Tyler Moreland", groupName: "Tyler", type: "Solo" },
    { fullName: "Brandon Donlon", groupName: "Brandon", type: "Solo" },
    { fullName: "Courtney Deutsch", groupName: "Courtney", type: "Solo" },
    { fullName: "Emily Stern", groupName: "Emily S.", type: "Solo" },
    { fullName: "Erin Berger", groupName: "Erin", type: "Solo" },
    { fullName: "Julia Conway", groupName: "Julia", type: "Solo" },
    { fullName: "Laura Esposito", groupName: "Laura", type: "Solo" },
    { fullName: "Pooja Yadav", groupName: "Pooja", type: "Solo" },
    { fullName: "Sophie Segreti", groupName: "Sophie", type: "Solo" },
    { fullName: "Fiona RItchey", groupName: "Fiona", type: "Solo" },
    { fullName: "Mary Zheng", groupName: "Mary Z.", type: "Solo" },
    { fullName: "Kevin Leung", groupName: "Kevin", type: "Solo" },
    { fullName: "Rene Bystron", groupName: "Rene", type: "Solo" },
    { fullName: "Alexis Baugher", groupName: "Alexis", type: "Solo" },
    { fullName: "Grace Newman", groupName: "Grace", type: "Solo" },
    { fullName: "Kylee Brown", groupName: "Kylee", type: "Solo" },
  ];

  const rotatingSrc = [
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
  ];

  // Rotate images on interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % rotatingSrc.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Calculate countdown
  const getCountdown = () => {
    const campStart = new Date('2026-10-09T14:00:00').getTime();
    const now = new Date().getTime();
    const distance = campStart - now;

    if (distance < 0) return 'CAMP IS HERE! 🏕️';

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === 'BIGBLONDEBLOWOUT') {
      setAuthenticated(true);
      setPasswordInput('');
    } else {
      alert('Wrong password, mama.');
    }
  };

  const handleGuestSearch = (name) => {
    setSearchName(name);
    if (name.trim() === '') {
      setSelectedGuest(null);
      return;
    }

    const found = guestList.find(
      (g) => g.fullName.toLowerCase().includes(name.toLowerCase())
    );

    if (found) {
      if (found.type === 'Couple') {
        const partners = guestList.filter((g) => g.groupName === found.groupName);
        setSelectedGuest({
          group: found.groupName,
          members: partners,
          type: 'Couple',
        });
      } else {
        setSelectedGuest({
          group: found.groupName,
          members: [found],
          type: 'Solo',
        });
      }
      setRsvpFormData({});
    } else {
      setSelectedGuest(null);
    }
  };

  const handleAttendanceChange = (name, value) => {
    setRsvpFormData((prev) => ({
      ...prev,
      [`${name}_attendance`]: value,
    }));
  };

  const handleActivityChange = (value) => {
    setRsvpFormData((prev) => ({
      ...prev,
      activities: value,
    }));
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('sending');

    try {
      const submission = {
        group: selectedGuest.group,
        members: selectedGuest.members.map((m) => ({
          name: m.fullName,
          attendance: rsvpFormData[`${m.fullName}_attendance`] || 'Not selected',
        })),
        activities: rsvpFormData.activities || 'None specified',
        timestamp: new Date().toISOString(),
      };

      // Send to backend API
      const response = await fetch('/api/submit-rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setSelectedGuest(null);
        setRsvpFormData({});
        setTimeout(() => setSubmissionStatus(null), 3000);
      } else {
        setSubmissionStatus('error');
        setTimeout(() => setSubmissionStatus(null), 3000);
      }
    } catch (error) {
      console.error('RSVP submission error:', error);
      setSubmissionStatus('error');
      setTimeout(() => setSubmissionStatus(null), 3000);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#2D5D3F' }}>
        <div className="max-w-md w-full">
          <div className="text-center mb-12">
            <h1 className="text-7xl font-bold mb-4" style={{ color: '#F4E4C1', fontFamily: 'Georgia, serif' }}>
              BP
            </h1>
            <h2 className="text-3xl font-light" style={{ color: '#F5F1EB' }}>
              Blonde Pines Camp
            </h2>
            <p className="text-sm mt-2" style={{ color: '#D4A574' }}>
              For Girls and Gays
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter camp password"
                className="w-full px-4 py-3 text-center rounded-lg"
                style={{ backgroundColor: '#F5F1EB', color: '#1A1A1A' }}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold transition"
              style={{ backgroundColor: '#D4A574', color: '#1A1A1A' }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#C49560')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#D4A574')}
            >
              Enter Camp
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'rsvp', label: 'RSVP', icon: Calendar },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'travel', label: 'Travel', icon: MapPin },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'lore', label: 'Camp Lore', icon: Flame },
    { id: 'map', label: 'Map', icon: Map },
  ];

  return (
    <div style={{ backgroundColor: '#F5F1EB', color: '#1A1A1A', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#2D5D3F', borderBottom: `4px solid #D4A574` }} className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold" style={{ color: '#F4E4C1', fontFamily: 'Georgia, serif' }}>
                BP
              </h1>
              <p className="text-xs" style={{ color: '#D4A574' }}>
                Blonde Pines Camp
              </p>
            </div>
            <button
              onClick={() => setAuthenticated(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition"
              style={{ backgroundColor: '#9B4F3F', color: '#F5F1EB' }}
            >
              <LogOut size={18} />
              <span className="text-sm">Leave Camp</span>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className="px-4 py-2 rounded-lg whitespace-nowrap font-semibold transition text-sm"
                style={{
                  backgroundColor: currentPage === item.id ? '#D4A574' : 'rgba(212, 165, 116, 0.2)',
                  color: currentPage === item.id ? '#1A1A1A' : '#2D5D3F',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* RSVP Page */}
        {currentPage === 'rsvp' && (
          <div className="grid md:grid-cols-2 gap-12">
            {/* Image Carousel */}
            <div>
              <img
                src={rotatingSrc[currentImageIndex]}
                alt="Camp life"
                className="w-full h-96 object-cover rounded-lg mb-6"
              />
              <div
                className="p-8 rounded-lg text-center"
                style={{ backgroundColor: '#2D5D3F', color: '#F5F1EB' }}
              >
                <p className="text-sm mb-2" style={{ color: '#D4A574' }}>TIME UNTIL CAMP</p>
                <p className="text-4xl font-bold" style={{ color: '#F4E4C1', fontFamily: 'Georgia, serif' }}>
                  {getCountdown()}
                </p>
              </div>
            </div>

            {/* RSVP Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#2D5D3F' }}>
                Will You Be There?
              </h2>

              {!selectedGuest ? (
                <div className="space-y-4 mb-8">
                  <input
                    type="text"
                    value={searchName}
                    onChange={(e) => handleGuestSearch(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border-2 rounded-lg"
                    style={{ borderColor: '#D4A574', backgroundColor: '#fff' }}
                  />
                  {searchName && !selectedGuest && (
                    <p style={{ color: '#9B4F3F' }} className="text-sm">
                      Guest not found. Check your spelling?
                    </p>
                  )}
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-8">
                  {selectedGuest.members.map((member) => (
                    <div
                      key={member.fullName}
                      className="p-6 rounded-lg"
                      style={{ backgroundColor: 'rgba(212, 165, 116, 0.1)' }}
                    >
                      <h3 className="font-bold mb-4" style={{ color: '#2D5D3F' }}>
                        {member.fullName}
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name={`${member.fullName}_attendance`}
                            value="attending"
                            checked={rsvpFormData[`${member.fullName}_attendance`] === 'attending'}
                            onChange={(e) => handleAttendanceChange(member.fullName, e.target.value)}
                          />
                          <span className="text-sm">I'm THERE like a shock of blonde hair!!</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name={`${member.fullName}_attendance`}
                            value="not_attending"
                            checked={rsvpFormData[`${member.fullName}_attendance`] === 'not_attending'}
                            onChange={(e) => handleAttendanceChange(member.fullName, e.target.value)}
                          />
                          <span className="text-sm">Sending my regrets</span>
                        </label>
                      </div>
                    </div>
                  ))}

                  <div className="space-y-3">
                    <label style={{ color: '#2D5D3F' }} className="block font-semibold text-sm">
                      Special roles & participation
                    </label>
                    <textarea
                      value={rsvpFormData.activities || ''}
                      onChange={(e) => handleActivityChange(e.target.value)}
                      placeholder="Leading Olympics teams, facilitating arts & crafts, morning announcements, emceeing Talent Show, or other ideas..."
                      className="w-full px-4 py-3 border-2 rounded-lg"
                      style={{ borderColor: '#D4A574' }}
                      rows="4"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-lg font-semibold transition"
                      style={{ backgroundColor: '#2D5D3F', color: '#F5F1EB' }}
                    >
                      Submit RSVP
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedGuest(null);
                        setSearchName('');
                      }}
                      className="flex-1 py-3 rounded-lg font-semibold transition"
                      style={{ backgroundColor: '#D4A574', color: '#1A1A1A' }}
                    >
                      Change Guest
                    </button>
                  </div>

                  {submissionStatus === 'success' && (
                    <div className="p-4 rounded-lg bg-green-100 text-green-800 text-sm">
                      ✓ RSVP submitted! We'll see you at camp!
                    </div>
                  )}
                  {submissionStatus === 'error' && (
                    <div className="p-4 rounded-lg bg-red-100 text-red-800 text-sm">
                      Oops! Something went wrong. Try again?
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        )}

        {/* Schedule Page */}
        {currentPage === 'schedule' && (
          <div>
            <h2 className="text-4xl font-bold mb-12" style={{ color: '#2D5D3F' }}>
              Camp Schedule
            </h2>

            {[
              {
                date: 'Thursday, October 9',
                events: [
                  '2-4pm • Car and Bus Arrivals',
                  '5pm • Welcome Cocktails and Barbecue',
                  '🔥 Campfire and S\'mores',
                ],
              },
              {
                date: 'Friday, October 10',
                events: [
                  '🏆 Olympics • Compete against fellow campers',
                  '✨ Arts & Crafts • Blonde Prom activities',
                  '🎉 Blonde Prom • Formal wear and blonde hair requested, music by DJ Chinua',
                ],
              },
              {
                date: 'Saturday, October 11',
                events: [
                  '🎬 Talent Show Prep',
                  '🏀 Activity Periods • Basketball, Pickleball, and More',
                  '⭐ Talent Show • Show off your skills',
                ],
              },
              {
                date: 'Sunday, October 12',
                events: [
                  '🥐 Goodbye Brunch • 8:30-10am',
                  '👋 Checkout/Bus Departure • 10am',
                ],
              },
            ].map((day, idx) => (
              <div key={idx} className="mb-8">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#9B4F3F' }}>
                  {day.date}
                </h3>
                <div className="space-y-2">
                  {day.events.map((event, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <ChevronRight size={20} style={{ color: '#D4A574', marginTop: '2px', flexShrink: 0 }} />
                      <p className="text-lg">{event}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Travel Page */}
        {currentPage === 'travel' && (
          <div>
            <h2 className="text-4xl font-bold mb-12" style={{ color: '#2D5D3F' }}>
              Getting to Blonde Pines
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#9B4F3F' }}>
                  The Venue
                </h3>
                <p className="text-lg mb-4">
                  <strong style={{ color: '#2D5D3F' }}>Trails End Camp</strong>
                </p>
                <p className="mb-6">230 T516, Beach Lake, PA 18405</p>
                <p className="text-sm" style={{ color: '#666' }}>
                  Our beautiful home for the weekend sits on a pristine lake in the Poconos, with all the camp amenities and none of the awkwardness of actual summer.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#9B4F3F' }}>
                  How to Get There
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">✈️ Flying?</p>
                    <p className="text-sm">
                      Fly into Newark (EWR). If there's enough demand, buses will depart from Newark and the west side of Manhattan on 10/9, with return buses on Monday morning. TBD pricing — we'll confirm closer to the date.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">🚗 Driving?</p>
                    <p className="text-sm">
                      Camp has plenty of parking! Carpool sign-up coming soon for anyone who wants to coordinate rides or rent a car together.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQs Page */}
        {currentPage === 'faqs' && (
          <div>
            <h2 className="text-4xl font-bold mb-12" style={{ color: '#2D5D3F' }}>
              Frequently Asked Questions
            </h2>

            <div className="space-y-8 max-w-3xl">
              {[
                {
                  q: 'What\'s the housing situation?',
                  a: 'All campers will stay in a private room or semi-private room (almost all rooms have queen beds that sleep two and a private bathroom). All rooms have heat. If you have a plus one, you will be roomed with your plus one (unless explicitly requested otherwise). If you have a bunkmate preference, indicate that on the Housing, Meals, and Transportation survey in early August.',
                },
                {
                  q: 'What about meals?',
                  a: 'Camp will feed you three meals a day plus a snack, except on arrival and departure days. Refer to the schedule for meal times. Food will be excellent and plentiful.',
                },
                {
                  q: 'What do I pack?',
                  a: 'Weather in the Poconos in fall can be unpredictable. Think comfortable athleisure with layers to stay warm, and a fleece or light puffer at night. Room basics like bedding, towels, and shower toiletries are all provided. For Blonde Prom, bring formal wear. Blonde hair is required — wigs welcome!',
                },
                {
                  q: 'Blonde Prom attire?',
                  a: 'Formal, festive, and blond(e). Wear what makes you feel fabulous, go full glamour, and show up with blonde hair (yours, a wig, blonde highlights — get creative).',
                },
                {
                  q: 'What does camp cost?',
                  a: 'Cost of all meals, housing, and activities for three nights will run about $250/person. Final pricing TBD. If cost is a barrier to attending, please reach out directly.',
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg"
                  style={{ backgroundColor: 'rgba(212, 165, 116, 0.1)', borderLeft: '4px solid #D4A574' }}
                >
                  <h3 className="text-lg font-bold mb-3" style={{ color: '#2D5D3F' }}>
                    {faq.q}
                  </h3>
                  <p style={{ color: '#1A1A1A', lineHeight: '1.6' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Camp Lore Page */}
        {currentPage === 'lore' && (
          <div className="text-center py-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#2D5D3F' }}>
              Camp Lore
            </h2>
            <p style={{ color: '#9B4F3F' }} className="text-lg">
              Coming soon... legendary stories from the Blonde Pines archives.
            </p>
          </div>
        )}

        {/* Map Page */}
        {currentPage === 'map' && (
          <div className="text-center py-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#2D5D3F' }}>
              Camp Map
            </h2>
            <p style={{ color: '#9B4F3F' }} className="text-lg">
              Custom illustrated camp map coming soon.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlondePinesSite;
