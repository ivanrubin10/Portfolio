#!/usr/bin/env node
import { spawn } from 'child_process';

console.log('🧪 Running Supabase database tests...');

// Run the tests using Node with ts-node
const testProcess = spawn('npx', ['jest', '--testMatch', '**/src/__tests__/supabase/**/*.test.ts'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_ENV: 'test',
  },
});

testProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ All tests passed!');
  } else {
    console.error('❌ Tests failed with code:', code);
  }
});

testProcess.on('error', (err) => {
  console.error('Error running tests:', err);
}); 