import { useEffect, useState } from 'react';
import axios from 'axios';
import { DiaryEntry } from './types';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries')
      .then(response => setDiaries(response.data))
      .catch(error => console.error('Error fetching diaries:', error));
  }, []);

  return (
    <div>
      <h1>Diary Entries</h1>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>Weather: {diary.weather}</p>
          <p>Visibility: {diary.visibility}</p>
          {diary.comment && <p>Comment: {diary.comment}</p>}
        </div>
      ))}
    </div>
  );
}

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState({
    date: '',
    weather: '',
    visibility: '',
    comment: ''
  });

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries')
      .then(response => setDiaries(response.data))
      .catch(error => console.error('Error fetching diaries:', error));
  }, []);

  const addDiary = (event: React.FormEvent) => {
    event.preventDefault();
    axios.post<DiaryEntry>('http://localhost:3000/api/diaries', newDiary)
      .then(response => setDiaries([...diaries, response.data]))
      .catch(error => {
        if (axios.isAxiosError(error) && error.response) {
          alert(`Error: ${error.response.data.error}`);
        } else {
          alert('An unknown error occurred');
        }
      });
  };  

  return (
    <div>
      <h1>Diary Entries</h1>
      <form onSubmit={addDiary}>
        <div>
          Date: <input type="text" value={newDiary.date} onChange={(e) => setNewDiary({ ...newDiary, date: e.target.value })} />
        </div>
        <div>
          Weather: <input type="text" value={newDiary.weather} onChange={(e) => setNewDiary({ ...newDiary, weather: e.target.value })} />
        </div>
        <div>
          Visibility: <input type="text" value={newDiary.visibility} onChange={(e) => setNewDiary({ ...newDiary, visibility: e.target.value })} />
        </div>
        <div>
          Comment: <input type="text" value={newDiary.comment} onChange={(e) => setNewDiary({ ...newDiary, comment: e.target.value })} />
        </div>
        <button type="submit">Add Entry</button>
      </form>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>Weather: {diary.weather}</p>
          <p>Visibility: {diary.visibility}</p>
          {diary.comment && <p>Comment: {diary.comment}</p>}
        </div>
      ))}
      <div>
  Date: <input type="date" value={newDiary.date} onChange={(e) => setNewDiary({ ...newDiary, date: e.target.value })} />
</div>
<div>
  Weather:
  {['sunny', 'rainy', 'cloudy', 'stormy', 'windy'].map(weather => (
    <label key={weather}>
      <input
        type="radio"
        value={weather}
        checked={newDiary.weather === weather}
        onChange={(e) => setNewDiary({ ...newDiary, weather: e.target.value })}
      />
      {weather}
    </label>
  ))}
</div>
<div>
  Visibility:
  {['great', 'good', 'ok', 'poor'].map(visibility => (
    <label key={visibility}>
      <input
        type="radio"
        value={visibility}
        checked={newDiary.visibility === visibility}
        onChange={(e) => setNewDiary({ ...newDiary, visibility: e.target.value })}
      />
      {visibility}
    </label>
  ))}
</div>
<div>
  Comment: <input type="text" value={newDiary.comment} onChange={(e) => setNewDiary({ ...newDiary, comment: e.target.value })} />
</div>

    </div>
    
  );
};

export default App;



