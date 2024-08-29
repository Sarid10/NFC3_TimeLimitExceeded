import React from 'react';
import gallery1 from "../assets/uploads/gallery/gallery1.jpg";
import gallery2 from "../assets/uploads/gallery/gallery2.png";
import gallery3 from "../assets/uploads/gallery/gallery3.jpg";

const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      image: gallery1,
      title: 'Healthcare Outreach Program - “Healthy Smiles”',
      description:
        'This image captures a heartwarming moment from our "Healthy Smiles" healthcare outreach program. The initiative was aimed at providing essential medical check-ups and health education to underserved communities.',
      feedback:
        'Seeing the genuine smiles on the faces of children and their families is the most rewarding part of this work. — Dr. Priya Singh, Volunteer',
    },
    {
      id: 2,
      image: gallery2,
      title: 'Community Bonding Event - “Friendship Day for Unity”',
      description:
        'This image highlights a vibrant scene from our "Friendship Day for Unity" event, where participants from various backgrounds came together to celebrate the spirit of friendship and unity.',
      feedback:
        'This event was truly special. We saw people from all walks of life come together to celebrate something as simple yet powerful as friendship. — Amit Desai, Volunteer Coordinator',
    },
    {
      id: 3,
      image: gallery3,
      title: 'Senior Empowerment Program - “Golden Smiles”',
      description:
        'This image captures a joyful moment from our "Golden Smiles" initiative, a program dedicated to empowering and uplifting the elderly in underprivileged communities.',
      feedback:
        'The joy on their faces is priceless. Through simple acts of kindness and spending quality time, we’ve been able to make a meaningful difference in their lives. — Rita Sharma, Volunteer',
    },
  ];

  // Updated inline styles for larger images and tagline
  const galleryStyles = {
    section: {
      padding: '2rem',
      backgroundColor: '#f9f9f9',
    },
    title: {
      marginTop: '4rem',
      textAlign: 'center',
      fontSize: '2.5rem',
      marginBottom: '1rem',
      color: '#333',
      fontFamily: 'Arial, sans-serif',
    },
    tagline: {
      textAlign: 'center',
      fontSize: '1.25rem',
      marginBottom: '2rem',
      color: '#555',
      fontFamily: 'Georgia, serif',
      fontStyle: 'italic',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
      gap: '1.5rem',
    },
    card: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '12px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    image: {
      width: '100%',
      height: 'auto',
      display: 'block',
      transition: 'transform 0.3s ease',
    },
    overlay: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      background: 'rgba(0, 0, 0, 0.7)',
      color: '#fff',
      padding: '1rem',
      transition: 'opacity 0.3s ease',
      opacity: '0',
    },
    overlayVisible: {
      opacity: '1',
    },
    overlayContent: {
      maxWidth: '80%',
    },
    titleCard: {
      fontSize: '1.5rem',
      marginBottom: '0.5rem',
      fontFamily: 'Georgia, serif',
    },
    description: {
      fontSize: '0.9rem',
      fontFamily: 'Verdana, sans-serif',
    },
    feedback: {
      fontSize: '0.9rem',
      marginTop: '0.5rem',
    },
  };

  return (
    <section style={galleryStyles.section}>
      <h1 style={galleryStyles.title}>Our Memories and Initiatives</h1>
      <p style={galleryStyles.tagline}>“Together, We Make the World Better”</p>
      <div style={galleryStyles.grid}>
        {galleryItems.map((item) => (
          <div
            style={galleryStyles.card}
            key={item.id}
            onMouseEnter={(e) => (e.currentTarget.querySelector('div').style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.querySelector('div').style.opacity = '0')}
          >
            <img src={item.image} alt={item.title} style={galleryStyles.image} />
            <div style={{ ...galleryStyles.overlay, ...(false ? galleryStyles.overlayVisible : {}) }}>
              <div style={galleryStyles.overlayContent}>
                <h2 style={galleryStyles.titleCard}>{item.title}</h2>
                <p style={galleryStyles.description}>{item.description}</p>
                <p style={galleryStyles.feedback}><strong>Volunteer Feedback:</strong> {item.feedback}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
