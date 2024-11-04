#!/bin/sh

npx prisma db seed

exec node dist/src/main