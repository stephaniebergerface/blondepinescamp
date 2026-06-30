import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';

const BlondePinesSite = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [currentPage, setCurrentPage] = useState('rsvp');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchName, setSearchName] = useState('');
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [rsvpFormData, setRsvpFormData] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

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
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=500&fit=crop',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % rotatingSrc.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getCountdown = () => {
    const campStart = new Date('2026-10-09T14:00:00').getTime();
    const now = new Date().getTime();
    const distance = campStart - now;
    if (distance < 0) return 'CAMP IS HERE! 🏕️';
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h`;
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
    const found = guestList.find((g) => g.fullName.toLowerCase().includes(name.toLowerCase()));
    if (found) {
      if (found.type === 'Couple') {
        const partners = guestList.filter((g) => g.groupName === found.groupName);
        setSelectedGuest({ group: found.groupName, members: partners, type: 'Couple' });
      } else {
        setSelectedGuest({ group: found.groupName, members: [found], type: 'Solo' });
      }
      setRsvpFormData({});
    } else {
      setSelectedGuest(null);
    }
  };

  const handleAttendanceChange = (name, value) => {
    setRsvpFormData((prev) => ({ ...prev, [`${name}_attendance`]: value }));
  };

  const handleActivityChange = (value) => {
    setRsvpFormData((prev) => ({ ...prev, activities: value }));
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
      try {
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
          throw new Error('Backend not ready');
        }
      } catch {
        console.log('RSVP Data:', submission);
        setSubmissionStatus('success');
        setSelectedGuest(null);
        setRsvpFormData({});
        setTimeout(() => setSubmissionStatus(null), 3000);
      }
    } catch (error) {
      setSubmissionStatus('error');
      setTimeout(() => setSubmissionStatus(null), 3000);
    }
  };

  if (!authenticated) {
    return (
      <div style={{ backgroundImage: 'linear-gradient(135deg, #F5E6D3 0%, #E8D4BF 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'Georgia, serif', position: 'relative', overflow: 'hidden' }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
          body { font-family: Georgia, serif; margin: 0; }
          ::placeholder { color: #B8956A; opacity: 0.7; }
        `}</style>
        <div style={{ maxWidth: '500px', width: '100%', zIndex: 10, position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ position: 'relative', marginBottom: '1.5rem', display: 'inline-block', width: '100%' }}>
              <svg viewBox="0 0 300 120" style={{ width: '100%', height: 'auto', maxWidth: '300px' }} preserveAspectRatio="xMidYMid meet">
                <defs>
                  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="3" dy="3" stdDeviation="2" floodOpacity="0.3"/>
                  </filter>
                </defs>
                <text x="50%" y="85" fontSize="90" fontWeight="900" fontFamily="'Playfair Display', serif" fill="#D4A574" textAnchor="middle" filter="url(#shadow)" letterSpacing="8">BP</text>
              </svg>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '400', color: '#3D4A3D', margin: '0 0 0.3rem 0', letterSpacing: '3px', textTransform: 'uppercase' }}>Blonde Pines</h2>
            <p style={{ fontSize: '0.9rem', color: '#8B7355', margin: 0, letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '300' }}>Camp for Girls and Gays</p>
            <div style={{ height: '2px', width: '60px', backgroundColor: '#D4A574', margin: '1rem auto 0' }}></div>
          </div>

          <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Enter password" style={{ width: '100%', padding: '1rem', borderRadius: '0', border: '2px solid #D4A574', backgroundColor: '#FFFBF5', color: '#3D4A3D', fontSize: '1rem', fontFamily: 'Georgia, serif', letterSpacing: '1px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} />
            <button type="submit" style={{ width: '100%', padding: '1rem', borderRadius: '0', fontWeight: '400', backgroundColor: '#D4A574', color: '#FFFBF5', border: 'none', cursor: 'pointer', fontSize: '1rem', fontFamily: 'Georgia, serif', letterSpacing: '2px', textTransform: 'uppercase', boxShadow: '0 4px 12px rgba(212, 165, 116, 0.3)', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#C49560'; e.target.style.boxShadow = '0 6px 16px rgba(212, 165, 116, 0.4)'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = '#D4A574'; e.target.style.boxShadow = '0 4px 12px rgba(212, 165, 116, 0.3)'; }}>Enter Camp</button>
          </form>
        </div>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', backgroundColor: 'rgba(212, 165, 116, 0.08)', borderRadius: '50%', zIndex: 0 }}></div>
      </div>
    );
  }

  return (
    <div style={{ backgroundImage: 'linear-gradient(to bottom, #FFFBF5 0%, #F5E6D3 100%)', minHeight: '100vh', fontFamily: 'Georgia, serif', color: '#3D4A3D' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        input, textarea { font-family: Georgia, serif; }
        input[type="radio"] { accent-color: #D4A574; }
      `}</style>
      
      <header style={{ backgroundColor: '#FFFBF5', borderBottom: '3px solid #D4A574', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '90rem', margin: '0 auto', padding: '2rem 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#D4A574', fontFamily: "'Playfair Display', serif", margin: 0, letterSpacing: '2px' }}>BP</h1>
              <p style={{ fontSize: '0.75rem', color: '#8B7355', margin: '0.25rem 0 0 0', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '400' }}>Blonde Pines Camp</p>
            </div>
            <button onClick={() => setAuthenticated(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.2rem', borderRadius: '0', backgroundColor: '#3D4A3D', color: '#FFFBF5', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '400', fontFamily: 'Georgia, serif', letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.3s' }} onMouseEnter={(e) => (e.target.style.backgroundColor = '#2D3A2D')} onMouseLeave={(e) => (e.target.style.backgroundColor = '#3D4A3D')}><LogOut size={16} />Leave</button>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', borderTop: '2px solid #D4A574' }}>
            {[{ id: 'rsvp', label: 'RSVP' }, { id: 'schedule', label: 'Schedule' }, { id: 'travel', label: 'Travel' }, { id: 'faqs', label: 'FAQs' }, { id: 'lore', label: 'Camp Lore' }, { id: 'map', label: 'Map' }].map((item) => (
              <button key={item.id} onClick={() => setCurrentPage(item.id)} style={{ padding: '0.8rem 1.5rem', borderRadius: '0', whiteSpace: 'nowrap', fontWeight: currentPage === item.id ? '600' : '400', fontSize: '0.9rem', border: 'none', cursor: 'pointer', backgroundColor: 'transparent', color: currentPage === item.id ? '#D4A574' : '#8B7355', borderBottom: currentPage === item.id ? '3px solid #D4A574' : 'none', fontFamily: 'Georgia, serif', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '0.8rem', transition: 'all 0.3s' }}>{item.label}</button>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '90rem', margin: '0 auto', padding: '3rem 2rem' }}>
        {currentPage === 'rsvp' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '3rem' }}>
            <div>
              <img src={rotatingSrc[currentImageIndex]} alt="Camp" style={{ width: '100%', height: '480px', objectFit: 'cover', marginBottom: '2rem', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }} />
              <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#FFFBF5', border: '3px solid #D4A574', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <p style={{ fontSize: '0.8rem', marginBottom: '1rem', color: '#D4A574', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 1rem 0' }}>Days Until Camp</p>
                <p style={{ fontSize: '2.8rem', fontWeight: '900', color: '#D4A574', fontFamily: "'Playfair Display', serif", margin: 0 }}>{getCountdown()}</p>
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem', color: '#3D4A3D', fontFamily: "'Playfair Display', serif" }}>Will You Be There?</h2>
              {!selectedGuest ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <input type="text" value={searchName} onChange={(e) => handleGuestSearch(e.target.value)} placeholder="Your full name" style={{ width: '100%', padding: '1rem', borderRadius: '0', border: '2px solid #D4A574', backgroundColor: '#FFFBF5', color: '#3D4A3D', fontSize: '1rem', fontFamily: 'Georgia, serif' }} />
                  {searchName && !selectedGuest && <p style={{ color: '#A67C52', fontSize: '0.95rem', margin: 0 }}>Guest not found. Check spelling?</p>}
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {selectedGuest.members.map((member) => (
                    <div key={member.fullName} style={{ padding: '1.5rem', backgroundColor: '#FFFBF5', border: '2px solid rgba(212, 165, 116, 0.5)' }}>
                      <h3 style={{ fontWeight: '600', marginBottom: '1rem', color: '#3D4A3D', fontSize: '1.1rem', margin: 0 }}>{member.fullName}</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.95rem' }}>
                          <input type="radio" name={`${member.fullName}_attendance`} value="attending" checked={rsvpFormData[`${member.fullName}_attendance`] === 'attending'} onChange={(e) => handleAttendanceChange(member.fullName, e.target.value)} />
                          I'm THERE like a shock of blonde hair!!
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.95rem' }}>
                          <input type="radio" name={`${member.fullName}_attendance`} value="not_attending" checked={rsvpFormData[`${member.fullName}_attendance`] === 'not_attending'} onChange={(e) => handleAttendanceChange(member.fullName, e.target.value)} />
                          Sending my regrets
                        </label>
                      </div>
                    </div>
                  ))}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                    <label style={{ color: '#3D4A3D', fontWeight: '600', fontSize: '0.95rem', letterSpacing: '0.5px' }}>Activities & Roles</label>
                    <textarea value={rsvpFormData.activities || ''} onChange={(e) => handleActivityChange(e.target.value)} placeholder="Olympics, arts & crafts, announcements, talent show emcee..." style={{ width: '100%', padding: '1rem', borderRadius: '0', border: '2px solid #D4A574', backgroundColor: '#FFFBF5', color: '#3D4A3D', fontSize: '0.95rem', minHeight: '100px', fontFamily: 'Georgia, serif', resize: 'vertical' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button type="submit" style={{ flex: 1, padding: '0.9rem', borderRadius: '0', fontWeight: '600', backgroundColor: '#D4A574', color: '#FFFBF5', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'Georgia, serif', letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.3s', boxShadow: '0 4px 12px rgba(212, 165, 116, 0.3)' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#C49560'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = '#D4A574'; }}>Submit RSVP</button>
                    <button type="button" onClick={() => { setSelectedGuest(null); setSearchName(''); }} style={{ flex: 1, padding: '0.9rem', borderRadius: '0', fontWeight: '600', backgroundColor: 'transparent', color: '#D4A574', border: '2px solid #D4A574', cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'Georgia, serif', letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(212, 165, 116, 0.1)'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }}>Change Guest</button>
                  </div>
                  {submissionStatus === 'success' && <div style={{ padding: '1rem', borderRadius: '0', backgroundColor: 'rgba(100, 150, 100, 0.15)', color: '#2D5D2D', fontSize: '0.9rem', border: '2px solid rgba(100, 150, 100, 0.4)' }}>✓ RSVP submitted! We'll see you at camp!</div>}
                  {submissionStatus === 'error' && <div style={{ padding: '1rem', borderRadius: '0', backgroundColor: 'rgba(200, 100, 100, 0.15)', color: '#8B3D3D', fontSize: '0.9rem', border: '2px solid rgba(200, 100, 100, 0.4)' }}>Something went wrong. Try again?</div>}
                </form>
              )}
            </div>
          </div>
        )}
        {currentPage === 'schedule' && (
          <div>
            <h2 style={{ fontSize: '2.8rem', fontWeight: '700', marginBottom: '3rem', color: '#3D4A3D', fontFamily: "'Playfair Display', serif" }}>Camp Schedule</h2>
            {[{ date: 'Thursday, October 9', events: ['2–4pm • Car and Bus Arrivals', '5pm • Welcome Cocktails and Barbecue', 'Campfire and S\'mores'] }, { date: 'Friday, October 10', events: ['Olympics • Compete against your fellow campers', 'Arts & Crafts', 'Blonde Prom • Formal wear and blonde hair requested'] }, { date: 'Saturday, October 11', events: ['Talent Show Prep', 'Activity Periods • Basketball, Pickleball, and More', 'Talent Show'] }, { date: 'Sunday, October 12', events: ['Goodbye Brunch • 8:30–10am', 'Checkout/Bus Departure • 10am'] }].map((day, idx) => (
              <div key={idx} style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '2px solid rgba(212, 165, 116, 0.3)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.2rem', color: '#D4A574' }}>{day.date}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginLeft: '1.5rem' }}>
                  {day.events.map((event, i) => (<p key={i} style={{ margin: 0, fontSize: '1rem', color: '#3D4A3D', borderLeft: '3px solid #D4A574', paddingLeft: '1rem' }}>{event}</p>))}
                </div>
              </div>
            ))}
          </div>
        )}
        {currentPage === 'travel' && (
          <div>
            <h2 style={{ fontSize: '2.8rem', fontWeight: '700', marginBottom: '3rem', color: '#3D4A3D', fontFamily: "'Playfair Display', serif" }}>Getting to Blonde Pines</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.2rem', color: '#D4A574' }}>The Venue</h3>
                <p style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#3D4A3D', fontWeight: '600' }}>Trails End Camp</p>
                <p style={{ marginBottom: '1.5rem', color: '#3D4A3D', fontSize: '1rem' }}>230 T516, Beach Lake, PA 18405</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.2rem', color: '#D4A574' }}>How to Get There</h3>
                <p style={{ fontSize: '0.95rem', color: '#3D4A3D', marginBottom: '1rem' }}><strong>Flying?</strong> Fly into Newark. Buses departing from Newark and Manhattan on 10/9.</p>
                <p style={{ fontSize: '0.95rem', color: '#3D4A3D' }}><strong>Driving?</strong> Plenty of parking! Carpool sign-up coming soon.</p>
              </div>
            </div>
          </div>
        )}
        {currentPage === 'faqs' && (
          <div>
            <h2 style={{ fontSize: '2.8rem', fontWeight: '700', marginBottom: '3rem', color: '#3D4A3D', fontFamily: "'Playfair Display', serif" }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '64rem' }}>
              {[{ q: 'What's the housing?', a: 'Private or semi-private rooms with queen beds and private bathrooms. Heat included.' }, { q: 'What about meals?', a: 'Three meals daily plus snacks (except arrival/departure). Food will be excellent.' }, { q: 'What do I pack?', a: 'Comfortable athleisure with layers. Bedding provided. For Blonde Prom: formal wear and blonde hair.' }, { q: 'Cost?', a: '$250/person for all meals, housing, and activities. If cost is a barrier, reach out.' }].map((faq, idx) => (
                <div key={idx} style={{ paddingBottom: '1.5rem', borderBottom: '2px solid rgba(212, 165, 116, 0.3)' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.8rem', color: '#3D4A3D' }}>{faq.q}</h3>
                  <p style={{ color: '#3D4A3D', lineHeight: '1.7', margin: 0, fontSize: '0.95rem' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {currentPage === 'lore' && <div style={{ textAlign: 'center', paddingTop: '4rem' }}><h2 style={{ fontSize: '2.8rem', fontWeight: '700', marginBottom: '1.5rem', color: '#3D4A3D', fontFamily: "'Playfair Display', serif" }}>Camp Lore</h2><p style={{ color: '#8B7355', fontSize: '1.05rem' }}>Coming soon... legendary stories from the Blonde Pines archives.</p></div>}
        {currentPage === 'map' && <div style={{ textAlign: 'center', paddingTop: '4rem' }}><h2 style={{ fontSize: '2.8rem', fontWeight: '700', marginBottom: '1.5rem', color: '#3D4A3D', fontFamily: "'Playfair Display', serif" }}>Camp Map</h2><p style={{ color: '#8B7355', fontSize: '1.05rem' }}>Custom illustrated camp map coming soon.</p></div>}
      </main>
    </div>
  );
};

export default BlondePinesSite;
