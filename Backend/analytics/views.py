from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import PlatformProfile, PlatformStats
from .serializers import ConnectPlatformSerializer, PlatformProfileSerializer
from .mock_fetcher import fetch_stats


class ConnectPlatformView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ConnectPlatformSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        platform = serializer.validated_data['platform_name']
        handle   = serializer.validated_data['handle']

        profile, created = PlatformProfile.objects.update_or_create(
            user=request.user,
            platform_name=platform,
            defaults={'handle': handle},
        )

        # Fetch (mocked) stats and save
        raw = fetch_stats(platform, handle)
        PlatformStats.objects.update_or_create(
            profile=profile,
            defaults=raw,
        )

        return Response(
            PlatformProfileSerializer(profile).data,
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )


class DashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profiles = (PlatformProfile.objects
                    .filter(user=request.user)
                    .select_related('stats'))

        data = PlatformProfileSerializer(profiles, many=True).data

        # Aggregate totals across platforms
        total_problems = sum(
            p['stats']['problems_solved']
            for p in data if p.get('stats')
        )
        total_contests = sum(
            p['stats']['contests']
            for p in data if p.get('stats')
        )
        avg_rating = (
            sum(p['stats']['rating'] for p in data if p.get('stats')) // len(data)
            if data else 0
        )

        return Response({
            'platforms': data,
            'summary': {
                'total_problems_solved': total_problems,
                'total_contests':        total_contests,
                'average_rating':        avg_rating,
                'platforms_connected':   len(data),
            },
        })
