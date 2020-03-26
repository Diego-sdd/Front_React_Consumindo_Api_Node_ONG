import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowDownLeft } from 'react-icons/fi';
import api from '../../services/api'
import './style.css';
import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('OngId');
    const History = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('/incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });
            History.push('/profile');
        } catch (error) {
            alert("Erro ao cadastrar");
        }
    }

    return (
        <div className="newIncident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"></img>

                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o caso detalhado para encontrar um herói para resolver isso.</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowDownLeft size={16} color="E02041"></FiArrowDownLeft>
                            Voltar Para Home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Título do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <textarea
                        placeholder="Descrição de Caso"
                        value={description}
                        onChange={e => setDescription(e.target.value)} />
                    <input
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)} />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}