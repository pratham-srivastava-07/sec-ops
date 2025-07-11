use clap::{Parser, Subcommand}; 


#[derive(Parser, Debug)]
#[command(name = "circl", about = "CIRCL - Collaborative Incident Response CLI")]
pub struct CLI {
    #[command(subcommand)]
    pub command: Commands,
}

#[derive(Subcommand, Debug)]
pub enum Commands {
    Login, 
    Logout,
    Whoami,
    Incident {
        #[command(subcommand)]
        action: IncidentActions,
    },
    Log {
        #[command(subcommand)]
        action: LogActions,
    },
    User {
        #[command(subcommand)]
        action: UserActions,
    },
    Config,
    Ping,
}

#[derive(Subcommand, Debug)]
pub enum IncidentActions {
    Create {
        title: String,
        #[arg(long)]
        severety: String,
        #[arg(long)]
        catagory: String,
        #[arg(long)]
        source: String,
    },
    List,
    View {
        id: String,
    },
    Update {
        id: String,
        #[arg(long)]
        status: String,
        #[arg(long)]
        assign_to: String,
    }
}

#[derive(Subcommand, Debug)]
pub enum LogActions {
    Add {
        incident_id: String,
        message: String,
    },
    Stream {
        incident_id: String,
    },
    ListLogs {
        incident_id: String,
    },
}


#[derive(Subcommand, Debug)]
pub enum UserActions {
    Assign {
        incident_id: String,
        email: String,
    },
    Join {
        incident_id: String,
    },
    Leave {
        incident_id: String,
    },
}

