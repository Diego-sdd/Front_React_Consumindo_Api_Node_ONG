import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './style.css';

import api from '../../services/api';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
    const [id, setId] = useState('');

    const History = useHistory();
    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });
            localStorage.setItem('OngId', id);
            localStorage.setItem('ongName', response.data.name);
            History.push('/profile');
        } catch (error) {
            alert('Falha no login');
        }
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero"></img>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input placeholder="Seu ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <button type="submit" className="button">Entrar</button>
                </form>

                <Link to="/register" className="back-link">
                    <FiLogIn size={16} color="E02041"></FiLogIn>
                    Não tenho cadastro
                </Link>
            </section>

            <img src={heroesImg} alt="Heroes"></img>

        </div>
    );
}