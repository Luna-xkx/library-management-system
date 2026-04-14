import React, { useEffect, useState } from "react"; 
 
function MyHistory() { 
  const [history, setHistory] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
 
  useEffect(() => { 
    fetchHistory(); 
  }, []); 
 
  const fetchHistory = async () => { 
    try { 
      const token = localStorage.getItem('token'); 
      if (!token) { 
        setError('请先登录'); 
        setLoading(false); 
        return; 
      } 
      const response = await fetch('http://localhost:3001/api/loans/my-history', { 
        headers: { 'Authorization': `Bearer ${token}` } 
      }); 
      if (!response.ok) throw new Error('获取失败'); 
      const data = await response.json(); 
      setHistory(data); 
    } catch (err) { 
      setError(err.message); 
    } finally { 
      setLoading(false); 
    } 
  }; 
 
  if (loading) return <div>加载中...</div>; 
  if (error) return <div>{error}</div>; 
 
  return <div> 
    <h2>我的借阅历史</h2> 
    {history.length === 0 ? <p>暂无记录</p> : <ul> 
      {history.map(loan => <li key={loan.id}>{loan.book?.title} - {loan.status}</li>)} 
    </ul>} 
  </div>; 
} 
 
export default MyHistory; 
