import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

// Assuming brief.txt is in the root of the project
const briefPath = path.join(__dirname, '../brief.txt');

// Define your PostgreSQL connection details
const pool = new Pool({
  user: 'your_user',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432, // Default PostgreSQL port
});

interface SensorData {
  timestamp: string;
  sensorId: string;
  value: number;
  unit: string;
}

async function insertSensorData(data: SensorData) {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO sensors (timestamp, sensor_id, value, unit)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (timestamp, sensor_id) DO NOTHING;
    `;
    const values = [data.timestamp, data.sensorId, data.value, data.unit];
    await client.query(query, values);
    console.log('Data inserted successfully:', data);
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    client.release();
  }
}

async function readAndProcessBrief() {
  try {
    const data = fs.readFileSync(briefPath, 'utf8');
    // Assuming brief.txt contains one JSON object per line, each representing SensorData
    const lines = data.split('\n').filter(line => line.trim() !== '');

    for (const line of lines) {
      try {
        const sensorData: SensorData = JSON.parse(line);
        await insertSensorData(sensorData);
      } catch (parseError) {
        console.error('Error parsing line as JSON:', line, parseError);
      }
    }

  } catch (err) {
    console.error('Error reading brief.txt:', err);
  } finally {
    pool.end(); // Close the pool when done
  }
}

readAndProcessBrief();