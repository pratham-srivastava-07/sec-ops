mod cli;

use crate::cli::cli::CLI; 
use clap::{Parser, CommandFactory};


fn main() {
    let _cli = CLI::parse();
    println!("Available commands: {}", CLI::command());
} 