import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!username || !password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        navigate('/')
      } else {
        setError(data.msg || 'Login failed')
      }
    } catch (err) {
      setError('Error connecting to server: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Login to your account</h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p style={{ marginTop: '10px' }}>
            Don't have an account?{' '}
            <Link to="/register">
              <button type="button" style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                Register here
              </button>
            </Link>
          </p>
        </form>
      </section>
    </>
  )
}

export default Login