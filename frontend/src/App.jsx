import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    character_class: "Воин",
    level: 5,
    weapon: "Меч",
    description: "",
  });

  const [character, setCharacter] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "level" ? Number(value) : value,
    }));

    setError("");
  };

  const isValid =
    form.name.trim().length >= 3 &&
    form.level >= 1 &&
    form.level <= 100 &&
    form.description.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      return;
    }

    setLoading(true);
    setError("");
    setCharacter(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/characters/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Не удалось создать персонажа"
        );
      }

      setCharacter(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>🎮 Создай своего персонажа</h1>

        <form onSubmit={handleSubmit} className="character-form">
          <label>
            Имя персонажа
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Например, Arthas"
            />

            {form.name.length > 0 &&
              form.name.trim().length < 3 && (
                <span className="validation-error">
                  Минимум 3 символа
                </span>
              )}
          </label>

          <label>
            Класс
            <select
              name="character_class"
              value={form.character_class}
              onChange={handleChange}
            >
              <option value="Воин">Воин</option>
              <option value="Маг">Маг</option>
              <option value="Лучник">Лучник</option>
              <option value="Разбойник">Разбойник</option>
            </select>
          </label>

          <label>
            Уровень
            <input
              type="number"
              name="level"
              min="1"
              max="100"
              value={form.level}
              onChange={handleChange}
            />

            {(form.level < 1 || form.level > 100) && (
              <span className="validation-error">
                Уровень должен быть от 1 до 100
              </span>
            )}
          </label>

          <label>
            Оружие
            <select
              name="weapon"
              value={form.weapon}
              onChange={handleChange}
            >
              <option value="Меч">Меч</option>
              <option value="Посох">Посох</option>
              <option value="Лук">Лук</option>
              <option value="Кинжал">Кинжал</option>
            </select>
          </label>

          <label>
            Описание
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Опишите своего персонажа"
            />

            {form.description.length > 0 &&
              !form.description.trim() && (
                <span className="validation-error">
                  Описание не должно быть пустым
                </span>
              )}
          </label>

          <button
            type="submit"
            disabled={!isValid || loading}
          >
            {loading ? "Создание..." : "СОЗДАТЬ ПЕРСОНАЖА"}
          </button>
        </form>

        {error && (
          <div className="error">
            ❌ {error}
          </div>
        )}

        {character && (
          <div className="character-card">
            <h2>⚔️ {character.name.toUpperCase()}</h2>

            <p>
              <strong>Класс:</strong>{" "}
              {character.character_class}
            </p>

            <p>
              <strong>Уровень:</strong>{" "}
              {character.level}
            </p>

            <p>
              <strong>Оружие:</strong>{" "}
              {character.weapon}
            </p>

            <p>{character.description}</p>

            <div className="success">
              ✅ Персонаж создан
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
