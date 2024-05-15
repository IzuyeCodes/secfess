"use server";
import { loadEnvConfig } from '@next/env'
const path = require('path');

const projectDir = process.cwd()
loadEnvConfig(projectDir)
