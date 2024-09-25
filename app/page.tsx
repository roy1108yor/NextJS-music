'use client'
import { useRouter } from 'next/navigation' 

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/audio/upload');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button 
        onClick={handleClick} 
        style={{ 
          backgroundColor: 'red', 
          color: 'yellow', 
          width: '200px', 
          height: '200px',
          fontSize: '12px',
          cursor: 'pointer'
        }}
      >
        Upload test test 1234 uuuuuuuu
      </button>
    </div>
  );
}