import { useEffect, useState } from 'react';
import { getMembers } from '../../services/memberService';
import './MemberSection.css';

function MemberSection() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMembers().then(data => setMembers(data));
  }, []);

  return (
    <section className="member-section">
      <h2 className="member-heading">Om oss</h2>
      <p className="member-intro">
        Vi är JTC, ett passionerat coverband från Göteborg som älskar att spela musik från olika epoker och genrer.
      </p>
      <div className="member-list">
        {members.map(member => (
          <div key={member.id} className="member-card">
            <img src={member.imageUrl} alt={member.name} className="member-img" />
            <div className="member-body">
              <h3 className="member-name">{member.name}</h3>
              <span className="member-role">{member.role}</span>
              <p className="member-bio">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MemberSection;