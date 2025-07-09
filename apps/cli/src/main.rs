mod cli;

use crate::cli::cli::CLI; 
use clap::Parser;

fn main() {
    let cli = CLI::parse();
    println!("Command: {}", cli.command);
}