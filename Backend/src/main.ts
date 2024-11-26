#!/usr/bin/env node
import { Command } from 'commander';
import { createUserCommand } from './App/Commands/CreateUserCommand';
import { localizeVehicleCommand } from './App/Commands/LocalizeVehicleCommand';
import { registerVehicleCommand } from './App/Commands/RegisterVehicleCommand';
import { scanDatabaseCommand } from './App/Commands/ScanDatabaseCommand';

const program = new Command();

program.command('create <userId>').description('Create a new fleet and return the fleetId').action(createUserCommand);

program
  .command('register-vehicle <fleetId> <vehiclePlateNumber>')
  .description('Register a vehicle to a fleet')
  .action(registerVehicleCommand);

program
  .command('localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng>')
  .description('Localize a vehicle in a fleet')
  .action(localizeVehicleCommand);

program.command('scan-database').description('Scan the database').action(scanDatabaseCommand);

program.parse(process.argv);
