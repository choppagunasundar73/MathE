#!/bin/bash

# Deploy Firestore indexes with project ID
firebase deploy --only firestore:indexes --project mathe-6947e

echo "Firestore indexes deployed successfully!"