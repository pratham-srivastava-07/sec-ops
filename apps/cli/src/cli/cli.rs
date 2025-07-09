use clap::{Parser}; 

#[derive(Parser, Debug)]
#[command(name = "CLI", about = "CIRCL")]
pub struct CLI {
    #[arg(short, long)]
    pub command: String,
}