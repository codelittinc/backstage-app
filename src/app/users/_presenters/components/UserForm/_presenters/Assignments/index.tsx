import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import useAssignmentsController from "../controllers/useAssignmentsController";
import Assignment from "@/app/_domain/interfaces/Assignment";
import Project from "@/app/_domain/interfaces/Project";

type AssignmentWithProject = Assignment & {
  project?: Project;
};

type Props = {
  userId: number;
};

function Assignments({ userId }: Props): JSX.Element {
  const { assignments, isLoading, updateAssignment, isUpdating } =
    useAssignmentsController(userId);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const handleEdit = (assignment: AssignmentWithProject) => {
    setEditingId(assignment.id as number);
    setFeedback(assignment.feedback || "");
  };

  const handleSave = (assignment: AssignmentWithProject) => {
    updateAssignment({
      ...assignment,
      feedback,
    });
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (!assignments?.length) {
    return (
      <Box p={3}>
        <Typography variant="body1" color="text.secondary">
          No assignments found for this user.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {assignments.map((assignment: AssignmentWithProject) => (
        <Grid item xs={12} key={assignment.id}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Period
                  </Typography>
                  <Typography variant="body1">
                    {format(new Date(assignment.startDate), "MMM d, yyyy")} -{" "}
                    {format(new Date(assignment.endDate), "MMM d, yyyy")}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Project
                  </Typography>
                  <Typography variant="body1">
                    {assignment.project?.name || "Unknown Project"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Feedback
                  </Typography>
                  {editingId === assignment.id ? (
                    <Box>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        disabled={isUpdating}
                      />
                      <Box mt={1} display="flex" gap={1}>
                        <button
                          onClick={() => handleSave(assignment)}
                          disabled={isUpdating}
                        >
                          Save
                        </button>
                        <button onClick={handleCancel} disabled={isUpdating}>
                          Cancel
                        </button>
                      </Box>
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant="body1">
                        {assignment.feedback || "No feedback provided"}
                      </Typography>
                      <button onClick={() => handleEdit(assignment)}>
                        {assignment.feedback ? "Edit" : "Add"} Feedback
                      </button>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Assignments;
