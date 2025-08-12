import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MoreHorizontal, AlertTriangle, CheckCircle, Clock, XCircle, Plus, RefreshCw, Calendar, User, MapPin, Eye, LayoutGrid, List } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ops/ui';
import { Button } from '@ops/ui';
import { Input } from '@ops/ui';
import { Badge } from '@ops/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ops/ui';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ops/ui';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@ops/ui';

// import {}

const PORT = process.env.PORT || 3001;

export default function Incidents() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table");

  async function getAllIncidents() {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:${PORT}/api/v1/incidents`);
      setData(res.data.result || []);
      return res.data;
    } catch(e) {
      console.log("Error occurred fetching incidents", e);
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllIncidents();
  }, []);

  const filteredIncidents = data.filter((incident: any) => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter;
    const matchesSeverity = severityFilter === "all" || incident.severity === severityFilter;
    
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const getStatusIcon = (status: any) => {
    switch(status?.toUpperCase()) {
      case 'OPEN': return <AlertTriangle className="w-4 h-4" />;
      case 'INVESTIGATING': return <Clock className="w-4 h-4" />;
      case 'RESOLVED': return <CheckCircle className="w-4 h-4" />;
      case 'CLOSED': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: any) => {
    switch(status?.toUpperCase()) {
      case 'OPEN': return 'bg-red-100 text-red-800 border-red-200';
      case 'INVESTIGATING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'RESOLVED': return 'bg-green-100 text-green-800 border-green-200';
      case 'CLOSED': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getSeverityColor = (severity: any) => {
    switch(severity?.toUpperCase()) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg">Loading incidents...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Incidents Management</h1>
            <p className="text-gray-600 mt-1">Monitor and manage security incidents</p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={getAllIncidents} variant="outline" size="sm" disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Incident
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{data.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Open</p>
                  <p className="text-2xl font-bold text-red-600">
                    {data.filter((i: any) => i.status === 'OPEN').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Investigating</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {data.filter((i: any) => i.status === 'INVESTIGATING').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical</p>
                  <p className="text-2xl font-bold text-red-600">
                    {data.filter((i: any) => i.severity === 'CRITICAL').length}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search incidents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="OPEN">Open</SelectItem>
                    <SelectItem value="INVESTIGATING">Investigating</SelectItem>
                    <SelectItem value="RESOLVED">Resolved</SelectItem>
                    <SelectItem value="CLOSED">Closed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="CRITICAL">Critical</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="LOW">Low</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                    className="rounded-r-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "cards" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("cards")}
                    className="rounded-l-none"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="text-sm text-gray-600 mb-4">
          Showing {filteredIncidents.length} of {data.length} incidents
        </div>

        {/* Content */}
        {viewMode === "cards" ? (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredIncidents.map((incident: any) => (
                <Card key={incident.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`${getStatusColor(incident.status)} text-xs`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(incident.status)}
                          {incident.status}
                        </div>
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            Assign
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{incident.title}</CardTitle>
                    <CardDescription className="line-clamp-3 text-sm">
                      {incident.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className={`${getSeverityColor(incident.severity)} text-xs`}>
                          {incident.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{incident.category}</span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="mr-2 h-3 w-3" />
                          {formatDate(incident.createdAt)}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="mr-2 h-3 w-3" />
                          {incident.source}
                        </div>
                        {incident.affectedSystems && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {incident.affectedSystems.slice(0, 2).map((system: any, idx: any) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {system}
                              </Badge>
                            ))}
                            {incident.affectedSystems.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{incident.affectedSystems.length - 2} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {incident.isReportable && (
                        <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                          <AlertTriangle className="h-3 w-3" />
                          Reportable incident
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <Card className="bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Incident</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Affected Systems</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncidents.map((incident: any) => (
                  <TableRow key={incident.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm">{incident.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2 max-w-xs">
                          {incident.description}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          ID: {incident.id.split('-')[0]}...
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(incident.status)} text-xs`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(incident.status)}
                          {incident.status}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getSeverityColor(incident.severity)} text-xs`}>
                        {incident.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{incident.category}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{incident.source}</span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(incident.createdAt)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {incident.affectedSystems ? incident.affectedSystems.slice(0, 2).map((system: any, idx: any) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {system}
                          </Badge>
                        )) : <span className="text-xs text-muted-foreground">None</span>}
                        {incident.affectedSystems && incident.affectedSystems.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{incident.affectedSystems.length - 2}
                          </Badge>
                        )}
                      </div>
                      {incident.isReportable && (
                        <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
                          <AlertTriangle className="h-3 w-3" />
                          Reportable
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            Assign
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        {/* Empty State */}
        {filteredIncidents.length === 0 && !loading && (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No incidents found</h3>
            <p className="text-gray-600 mb-4">
              {data.length === 0 
                ? "No incidents have been reported yet." 
                : "Try adjusting your search or filter criteria."
              }
            </p>
            {data.length === 0 && (
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create First Incident
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}